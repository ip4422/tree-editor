const CracoLessPlugin = require('craco-less')
const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './tsconfig.extend.json'
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@breadcrumb-font-size': 'ceil(@font-size-base * 1.42)',
              '@breadcrumb-icon-font-size': 'ceil(@font-size-base * 1.42)'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
