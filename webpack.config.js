const webpack = require('webpack');
module.exports = {

  entry: ['babel-polyfill', './src/index.js'],
   module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },      
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
     
      { 
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: "url-loader?limit=100000"
    },
    {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", "less-loader"],
        exclude: [
            // /\less\/AdminLTE.less$/
        ]
    }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.less']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: './bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port:8084,
    contentBase: './dist',
    historyApiFallback: true,    
    hot: true
  }
};