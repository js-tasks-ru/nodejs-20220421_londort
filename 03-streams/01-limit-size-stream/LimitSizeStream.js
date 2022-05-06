const stream = require('stream');
const { Chunk } = require('webpack');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.buf = 0;
  }

  _transform(chunk, encoding, callback) {
    this.buf += chunk.length;
    if (this.buf > this.limit){
      callback(new LimitExceededError());
    }else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
