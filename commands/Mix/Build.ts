import { BaseCommand, flags } from '@adonisjs/ace'
import { spawn } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

export default class MixBuild extends BaseCommand {
	public static commandName = 'mix:build'
	public static description = 'Compile Mix'

	@flags.boolean({ description: 'Build assets for production', default: false })
	public production: boolean

	@flags.boolean({
		description: 'Open bundle analyzer',
		default: false,
	})
	public analyze: boolean

	@flags.string({
		description:
			"The path to your Mix configuration file. The default is your root 'webpack.mix.js'",
		default: 'webpack.mix.js',
	})
	public mixConfig: string

	public async handle() {
		let webpackConfigPath = require.resolve('laravel-mix/setup/webpack.config.js')
		if (!existsSync(webpackConfigPath)) {
			this.logger.error('Please install Laravel Mix')
			return
		}

		if (this.analyze) {
			webpackConfigPath = require.resolve('../setup/webpack.config.js')
		}

		const mixConfigPath = join(this.application.cliCwd!, this.mixConfig)
		if (!existsSync(mixConfigPath)) {
			this.logger.error(`The Mix configuration file '${this.mixConfig}' is not found`)
			return
		}

		const script = [
			`npx cross-env NODE_ENV=${this.production ? 'production' : 'development'}`,
			`MIX_FILE=${this.mixConfig}`,
			'npx webpack --progress',
			`--config=${webpackConfigPath}`,
		].join(' ')

		if (process.env.TESTING) {
			process.stdout.write(script)
			return
		}

		spawn(script, {
			stdio: 'inherit',
			shell: true,
		})
	}
}
