var path = require("path");//用于处理目录的对象，提高开发效率（__dirname需要引入path后才可以使用）
var ROOT_PATH = path.resolve(__dirname);//获取当前整个模块文件所在目录的完整绝对路径
var BUILDS_PATH = path.resolve(ROOT_PATH, "builds");//获取我们的builds目录完整绝对路径
var SRC_PATH = path.resolve(ROOT_PATH, "src");//获取到我们的资源目录src的完整路径
var webpack=require('webpack');
var CleanPlugin=require('clean-webpack-plugin');
var ExtractPlugin=require('extract-text-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

var plugins = [

    new ExtractPlugin('bundle.css'),

    new webpack.optimize.CommonsChunkPlugin({
            name:      'main', // 将依赖移到我们的主文件
            children:  true, // 在所有被拆分的代码块中寻找共同的依赖关系
            minChunks: 2, // 在被提取之前，一个依赖要出现多少次（也就是一个依赖会在遍历所有拆分的代码块时被重复发现多少次）
    }),
];

if (production) {
    plugins = plugins.concat([

        new CleanPlugin('builds'),

        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        new webpack.LoaderOptionsPlugin({
            debug: true
        }),

        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                warnings: false, //  阻止难看的警告
            },
        }),

        new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            'process.env':   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        
    ]);
}

module.exports = {
  devtool:production?false:'eval',
    entry: './src',
    output: {
        path: BUILDS_PATH,
        filename: production?'[name]-[hash].js':'bundle.js',
        publicPath: 'builds/'
    },
    plugins:plugins,
    module: {
        rules: [{
          test: /\.js/,
          loader: 'babel-loader',
          include: SRC_PATH,
        }, {
          test: /\.scss/,
          use: ExtractPlugin.extract({
            fallback:'style-loader',
            use:['css-loader','sass-loader']
          })
          // Or
          //loaders: ['style-loader', 'css-loader', 'sass-loader'],
          }, {
          test: /\.html/,
          loader: 'html-loader'
        },{
          test:   /\.(png|gif|jpe?g|svg)$/i,
          loader: 'url-loader?limit=10000',
        }],
    }
};
