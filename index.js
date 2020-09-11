if (process.env.NODE_ENV === 'production') {
    module.exports = require('./src/InfiniteLoad/InfiniteLoad.jsx');
} else {
  module.exports = require('./src/InfiniteLoad/InfiniteLoad.jsx');
}
