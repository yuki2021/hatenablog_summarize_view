const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // アウトプットディレクトリをdocに変更
  outputDir: 'docs',
})
