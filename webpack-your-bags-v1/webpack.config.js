var path = require("path");//用于处理目录的对象，提高开发效率（__dirname需要引入path后才可以使用）
var ROOT_PATH = path.resolve(__dirname);//获取当前整个模块文件所在目录的完整绝对路径
var BUILDS_PATH = path.resolve(ROOT_PATH, "builds");//获取我们的builds目录完整绝对路径
var SRC_PATH = path.resolve(ROOT_PATH, "src");//获取到我们的资源目录src的完整路径
module.exports = {
    entry: './src',
    output: {
        path: BUILDS_PATH,
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
          test: /\.js/,
          loader: 'babel-loader',
          include: SRC_PATH,
        }, {
          test: /\.scss/,
          loader: 'style-loader!css-loader!sass-loader',
          // Or
          //loaders: ['style-loader', 'css-loader', 'sass-loader'],
          }, {
          test: /\.html/,
          loader: 'html-loader'
        }],
    }
};
