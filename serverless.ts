import type { AWS } from '@serverless/typescript'

import { remove } from './src/functions'

const serverlessConfiguration: AWS = {
  service: 'shrimphouse-chime-remove',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    region: 'ap-northeast-1',
    stage: 'beta'
  },
  functions: { remove }
}

module.exports = serverlessConfiguration
