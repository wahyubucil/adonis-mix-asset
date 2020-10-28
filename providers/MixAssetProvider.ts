import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ViewContract } from '@ioc:Adonis/Core/View'
import { existsSync, readFileSync } from 'fs'
import { mixAsset } from '../src/mixAsset'

export default class MixAssetProvider {
	constructor(protected app: ApplicationContract) {}
	public static needsApplication = true

	public register() {
		// Register your own bindings
	}

	/**
	 * Returns the manifest file contents. During development, we make use of the
	 * `readFileSync` method to read the fresh contents on every call
	 */
	private getManifestContents(manifestPath: string) {
		if (this.app.inProduction) {
			return require(manifestPath)
		}

		JSON.parse(readFileSync(manifestPath, 'utf-8'))
	}

	public boot() {
		// IoC container is ready
		this.app.container.with(['Adonis/Core/View'], (view: ViewContract) => {
			// Load manifest on boot. So it doesn't load every mixAsset function
			const manifestPath = this.app.publicPath('mix-manifest.json')
			if (existsSync(manifestPath)) {
				view.global('mix', (path: string) =>
					mixAsset(this.app, this.getManifestContents(manifestPath), path)
				)
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
