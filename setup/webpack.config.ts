import type { Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const webpackConfig = require('laravel-mix/setup/webpack.config.js') as Promise<Configuration>

export default async () => {
	const config = await webpackConfig
	config.plugins?.push(new BundleAnalyzerPlugin())

	return config
}
