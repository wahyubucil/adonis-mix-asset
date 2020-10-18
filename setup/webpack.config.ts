import type { Configuration } from 'webpack'

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackConfig = require('laravel-mix/setup/webpack.config.js') as Configuration

webpackConfig.plugins?.push(new BundleAnalyzerPlugin())

export default webpackConfig
