const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { rootPath, title, moduleKey } = require('./src/settings.js');

function resolve(dir) {
    return path.join(__dirname, dir);
}

// cdn.js.shift();
// cdn.js.unshift("https://ims.yzscloud.cn:9700/cdn2/static/vue/vue2.6.12.js")
// const showOutput = { // 输出重构  打包编译后的 文件名称
//     filename: `js/[name].[chunkhash].js`,
//     chunkFilename: `js/[name].[chunkhash].js`
// }
const isProduction = process.env.NODE_ENV === 'production'; //当前是否是正式版本
const isServer = process.env.RUN_TYPE === 'serve'; // 是否本地开发服务
const appName = process.env.VUE_APP_ENV_NAME;
const showTitle = isProduction ? title : `${title}-${appName}`;
// const showOut = isProduction?'':showOutput
module.exports = {
    publicPath: rootPath, // 默认'/'，部署应用包时的基本 URL 用于访问 多个 / ，如： http://10.10.200.82:8011/dispatcher/test/22 也能正常访问到 对应的js资源
    outputDir: './dist', // 'dist', 生产环境构建文件的目录
    assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false, //关闭eslint
    runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 生产环境的 source map
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('assets', resolve('./src/assets'))
            .set('components', resolve('./src/components'))
            .set('public', resolve('./public'))
            .set('views', resolve('./src/views'))
            .set('utils', resolve('./src/utils'))
            .set('api', resolve('./src/api'));
    },
    css: {
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                lessOptions: {
                    modifyVars: {
                        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                        hack: `true; @import "./src/style/vant.less";`
                    }
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.RUN_TYPE': JSON.stringify(process.env.RUN_TYPE),
                'process.env.VUE_APP_MODULE_KEY': moduleKey
            }),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'package.json'),
                    to: 'package.json'
                }
            ])
        ],
        name: showTitle,
        output: isServer
            ? {}
            : {
                  // 输出重构  打包编译后的 文件名称
                  filename: `js/[name].[chunkhash].js`,
                  chunkFilename: `js/[name].[chunkhash].js`
              }
    }
};
