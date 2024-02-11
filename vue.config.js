const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'docs',
  chainWebpack: config => {
    // JavaScriptファイルのファイル名設定を変更
    config.output
      .filename('js/[name].js')
      .chunkFilename('js/[name].js');
    
    // CSSファイルのファイル名設定を変更（Vue CLI 4以上が必要）
    config.plugin('extract-css').tap(args => [{
      ...args[0],
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }]);
  },
});
