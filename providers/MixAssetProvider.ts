import { IocContract } from '@adonisjs/fold'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ViewContract } from '@ioc:Adonis/Core/View'
import { existsSync } from 'fs'
import { mixAsset } from '../src/mixAsset'

export default class MixAssetProvider {
	constructor(protected $container: IocContract) {}

	public register() {
		// Register your own bindings
	}

	public boot() {
		// IoC container is ready
		this.$container.with(
			['Adonis/Core/Application', 'Adonis/Core/View'],
			(application: ApplicationContract, view: ViewContract) => {
				// Load manifest on boot. So it doesn't load every mixAsset function
				const manifestPath = application.publicPath('mix-manifest.json')
				if (existsSync(manifestPath)) {
					const manifest = require(manifestPath) as Record<string, string>
					view.global('mix', (path: string) => mixAsset(application, manifest, path))
				}
			}
		)
	}

	public shutdown() {
		// Cleanup, since app is going down
	}

	public ready() {
		// App is ready
	}
}
