var Readable = require('stream').Readable;
var inherits = require('util').inherits;
var walkitout = require('walkitout');

inherits(WioStream, Readable);

WioStream.prototype = Object.create(
  WioStream.prototype, {

  _read: {
    value: function () {
      if (!this._walkInitiated) this._walk();
    }
  },

  _walk: {
    value: function () {
      this._walkInitiated = true;

      this._cancelWalk = walkitout(this._walkStartPath,

        function (err, filename, done) {
          if (err) this.emit('error', err);
          else this.push(filename);
          done();
        }.bind(this),

        function (cancelled) {
          if (cancelled) this.emit('cancel');
          setImmediate(this.push.bind(this, null));
        }.bind(this),

        null,

        this._descentController
      );
    }
  },

  _cancelWalkUnbound: {
    value: function () {
      if (this._cancelWalkRequested) 
        return;

      this._cancelWalkRequested = true;
      this._cancelWalkWhenAble();
    }
  },

  _cancelWalkWhenAbleUnbound: {
    value: function () {
      if (this._cancelWalk) {
        this._cancelWalk();
      } else {
        this._cancelWalkTimer = setTimeout(
          this._cancelWalkWhenAble, 70);
      }
    }
  },

  _walkStartPath: { value: '', writable: true },
  _walkInitiated: { value: false, writable: true },
  _descentController: { value: null, writable: true },

  _cancelWalkRequested: { value: false, writable: true },
  _cancelWalkTimer: { value: null, writable: true },
  _cancelWalk: { value: null, writable: true },
  _cancelWalkWhenAble: { value: null, writable: true },

  cancelWalk: { value: null, writable: true }

});

module.exports = wiostream;

function wiostream(path, encoding, controller) {
  return new WioStream(path, encoding || 'utf8', controller);
}

function WioStream(startPath, encoding, controller) {
  this._walkStartPath = startPath;
  this._descentController = controller;
  this._cancelWalkWhenAble = this
    ._cancelWalkWhenAbleUnbound.bind(this);
  this.cancelWalk = this._cancelWalkUnbound.bind(this);

  Readable.call(this, {
    'encoding': encoding
  });
}
