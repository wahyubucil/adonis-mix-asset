/*
 * adonis-mix-asset
 *
 * (c) Wahyu Budi Saputra <wahyubucil@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { flags } from '@adonisjs/core/build/standalone'
import { existsSync } from 'fs'
import { relative } from 'path'
import { BaseMix } from './Base'

/**
 * Command to watch assets
 *
 * Reference: https://github.com/JeffreyWay/laravel-mix/blob/8cfacdde47/bin/cli.js
 */
export default class MixWatch extends BaseMix {
  public static commandName = 'mix:watch'
  public static description = 'Build and watch files for changes'
  public static settings = {
    stayAlive: true,
  }

  @flags.boolean({ description: 'Enable hot reloading' })
  public hot: boolean

  @flags.boolean({ description: 'Enable https' })
  public https: boolean

  public async run() {
    const mixConfigPath = this.application.makePath(this.mixConfig)
    if (!existsSync(mixConfigPath)) {
      this.logger.error(`The Mix configuration file '${this.mixConfig}' is not found`)
      return
    }

    let commandScript: string
    if (!this.hot) {
      if (this.isTTY && this.progress) commandScript = 'npx webpack --progress --watch'
      else commandScript = 'npx webpack --watch'
    } else {
      commandScript = 'npx webpack serve --hot' + (this.https ? ' --https' : '')
    }

    const webpackConfigPath = relative(
      this.application.appRoot,
      require.resolve('laravel-mix/setup/webpack.config.js')
    )

    const script = [commandScript, `--config="${webpackConfigPath}"`].join(' ')

    const scriptEnv = {
      NODE_ENV: 'development',
      MIX_FILE: this.mixConfig,
    }

    this.runScript(script, scriptEnv)
  }
}
