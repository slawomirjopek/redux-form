var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src') + '/app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist') + '/app',
    filename: 'bundle.js',
    publicPath: '/app/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [
            "react",
            "env",
          ],
          plugins: ["transform-class-properties"]
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]_[local]_[hash:base64:5]"
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[name]_[local]_[hash:base64:5]"
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
              ],
            },
          },
        ],
      },
      {
          test: /\.(png|jpg|gif)$/,
          loader: "file-loader"
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  }
};