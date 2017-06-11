var Readable = require('stream').Readable;
var inherits = require('util').inherits;
var walkitout = require('walkitout');

inherits(WioStream, Readable);

WioStream.prototype = Object.create(
  WioStream.prototype, {

  _read: {
    value: function () {
      if (!this._started) this._walk();
    }
  },

  _walk: {
    value: function () {
      this._started = true;

      walkitout(this._path,

        function (err, filename, done) {
          if (err) return done();
          this.push(filename);
          done();
        }.bind(this),

        function () {
          this.push(null);
        }.bind(this),

        null,

        this._controller
      );
    }
  }

});

module.exports = wiostream;

function wiostream(path, encoding, controller){
  return new WioStream(path, encoding || 'utf8', controller);
}

function WioStream(path, encoding, controller) {
  this._path = path;
  this._started = false;
  this._controller = controller;

  Readable.call(this, {
    'encoding': encoding
  });
}

