// webpack.config.js

module.exports = {
  // Otras configuraciones de Webpack
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
    },
  },
};
