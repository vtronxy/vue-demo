var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');

module.exports = {
    // 入口文件 这里配置其他主题的入口文件
    entry: {
        'ldMap': './ldMap.js'
    },
    //编译输出文件
    output: {
        path: path.resolve(__dirname, './dist'),
        //本机开发的时候，这里一定是/dist/ HRM的功能才会启动
        //部署的时候修改为 /bi/dist/  因为希望通过 http://ip:端口/bi/index-city-index.html访问
        filename: '[name].build.js',
        libraryTarget: 'umd'
    },
    //模块插件的处理规则
    module: {
        rules: [{ //这个配置对 *.vue <script>标签中 imported的 *.scss 同样有效 会使用babel方式处理JavaScript
                test: /\.vue$/,
                loader: 'vue-loader', //会检测babel-loader去处理JavaScript
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/ //不处理node_modules目录
            },
            {
                test: /\.scss$/, //在业务JavaScript代码中使用 import '*.scss'
                //loader: 'style-loader!css-loader!sass-loader'
                //查看多实例打包
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            { //处理中文图标有问题,还可以设置publicPath,1024是字节
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: '4096', //小于4kb的图片使用 url-loader处理，超过了使用file-loader处理
                    name: '[name].[ext]?[hash]',
                    outputPath: "img/",
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //全功能的vue
        }
    },
    devServer: {
        //contentBase: "/bi/dist/",
        inline: true,
        historyApiFallback: true,
        overlay: true, //将编译错误 显示在浏览器中
        noInfo: true,
        openPage: 'index-city-index.html'
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map', //source-map配置
    plugins: []
}

//npm run build 时执行 产品部署,增加webpack的配置
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"' //定义环境变量
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}