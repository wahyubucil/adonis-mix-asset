import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ViewContract } from '@ioc:Adonis/Core/View'
import { existsSync } from 'fs'
import { mixAsset } from '../src/mixAsset'

export default class MixAssetProvider {
	constructor(protected app: ApplicationContract) {}
	public static needsApplication = true

	public register() {
		// Register your own bindings
	}

	public boot() {
		// IoC container is ready
		this.app.container.with(['Adonis/Core/View'], (view: ViewContract) => {
			// Load manifest on boot. So it doesn't load every mixAsset function
			const manifestPath = this.app.publicPath('mix-manifest.json')
			if (existsSync(manifestPath)) {
				const manifest = require(manifestPath) as Record<string, string>
				view.global('mix', (path: string) => mixAsset(this.app, manifest, path))
			}
		})
	}

	public shutdown() {
		// Cleanup, since app is going down
	}

	public ready() {
		// App is ready
	}
}
