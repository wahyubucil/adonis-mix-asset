import { BaseCommand, flags } from '@adonisjs/ace'
import { existsSync } from 'fs'
import { join } from 'path'
import { webpack, Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export default class Mix extends BaseCommand {
	public static commandName = 'mix'
	public static description = 'Generate assets with Laravel Mix'

	@flags.boolean({
		description: 'Watch files to rebuild them on change',
		default: false,
	})
	public watch: boolean

	@flags.boolean({ description: 'Build assets for production', default: false })
	public production: boolean

	@flags.boolean({
		description: 'Open bundle analyzer',
		default: false,
	})
	public analyzer: boolean

	public async handle() {
		process.env.NODE_ENV = this.application.nodeEnvironment
		if (this.production) {
			process.env.NODE_ENV = 'production'
		}

		const mixConfig = join(this.application.cliCwd!, 'webpack.mix.js')
		if (!existsSync(mixConfig)) {
			this.logger.error('Make sure your project root has "webpack.mix.js" file')
			return
		}

		const webpackConfig = require(join(
			this.application.cliCwd!,
			'node_modules/laravel-mix/setup/webpack.config.js'
		)) as Configuration

		if (this.analyzer) {
			webpackConfig.plugins?.push(new BundleAnalyzerPlugin())
		}

		const compiler = webpack(webpackConfig)

		if (this.watch) {
			compiler.watch(webpackConfig.watchOptions ?? {}, (error, stats) => {
				if (error) console.error(error)
				console.log(stats?.toString(webpackConfig.stats))
			})
		} else {
			compiler.run((error, stats) => {
				if (error) console.error(error)
				console.log(stats?.toString(webpackConfig.stats))
			})
		}
	}
}
