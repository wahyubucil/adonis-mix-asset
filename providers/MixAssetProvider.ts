/*
 * adonis-mix-asset
 *
 * (c) Wahyu Budi Saputra <wahyubucil@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { existsSync, readFileSync } from 'fs'
import { mixAsset } from '../src/mixAsset'

export default class MixAssetProvider {
  constructor(protected app: ApplicationContract) {}

  /**
   * Returns the manifest file contents. During development, we make use of the
   * `readFileSync` method to read the fresh contents on every call
   */
  private getManifestContents(manifestPath: string) {
    if (this.app.inProduction) {
      return require(manifestPath)
    }

    return JSON.parse(readFileSync(manifestPath, 'utf-8'))
  }

  public boot() {
    const View = this.app.container.resolveBinding('Adonis/Core/View')
    const manifestPath = this.app.publicPath('mix-manifest.json')
    if (existsSync(manifestPath)) {
      View.global('mix', (path: string) =>
        mixAsset(this.app, this.getManifestContents(manifestPath), path)
      )
    }
  }
}
