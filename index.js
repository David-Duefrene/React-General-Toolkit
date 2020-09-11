if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/InfiniteLoad/InfiniteLoad.js');
} else {
  module.exports = require('./dist/InfiniteLoad/InfiniteLoad.js');
}
