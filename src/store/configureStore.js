if (process.env.NODE_ENV === 'production') {
  // dynamic imports aren't supported by ES6, so using require instead
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
