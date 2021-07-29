const path = require('path')
const fs = require('fs')
const { VueLoaderPlugin } = require('vue-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');



//外部扩展
let externals = [
   {
        vue : {
            root : 'Vue', //root：可以通过一个全局变量访问library
            commonjs: 'vue', //可以将library作为一个CommonJs模块访问
            commonjs2: 'vue' //和上面类似，但导出来的是module.exports.default
        }
   }
]
let plugins = [
    new VueLoaderPlugin(),
    new OptimizeCSSPlugin(),
    new CleanWebpackPlugin(['dist'],{
        root: path.resolve(__dirname, '../')
    }),
]

let configArr = []
let entryList = ['']
// const files = fs.readdirSync(path.resolve(__dirname, '../packages/' ))
// files.forEach(function (item, index) {
//     let stat = fs.lstatSync(path.resolve(__dirname, '../packages/' + item))
//     if (stat.isDirectory() === true && item != 'utils') { 
//         entryList.push(item)
//     }
// })


entryList.forEach(function(item){
    const config = {
        mode: 'production',
        entry: path.resolve(__dirname, '../packages/' + item + '/index.ts'),
        devtool: "cheap-eval-source-map",
        output: {
            path: path.resolve(__dirname, '../dist/' + item),
            publicPath: '/',
            filename: 'index.js',
            libraryTarget: 'umd',
            umdNamedDefine: true,
            globalObject: 'typeof self !== \'undefined\' ? self : this'
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test : /\.css$/,
                   // exclude: /node_modules/,
                    use : [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                  plugins: [
                                      (loader)=>require('autoprefixer')()
                                  ],
                                },
                            },
                        }
                    ]
    
                },
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',[
                                '@babel/preset-typescript',
                                {
                                    allExtensions: true
                                }
                            ]
                        ]
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts','.tsx','.js','.json']
        },
        externals,
        plugins,
    }

    configArr.push(config);
})

module.exports = configArr