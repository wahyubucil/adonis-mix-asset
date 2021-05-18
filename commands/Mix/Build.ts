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
 * Command to build assets
 *
 * Reference: https://github.com/JeffreyWay/laravel-mix/blob/8cfacdde47/bin/cli.js
 */
export default class MixBuild extends BaseMix {
  public static commandName = 'mix:build'
  public static description = 'Compile Mix'
  public static settings = {
    stayAlive: true,
  }

  @flags.boolean({ description: 'Build assets for production' })
  public production: boolean

  @flags.boolean({ description: 'Open bundle analyzer' })
  public analyze: boolean

  public async run() {
    const mixConfigPath = this.application.makePath(this.mixConfig)
    if (!existsSync(mixConfigPath)) {
      this.logger.error(`The Mix configuration file '${this.mixConfig}' is not found`)
      return
    }

    let commandScript: string
    if (this.isTTY && this.progress) commandScript = 'npx webpack --progress'
    else commandScript = 'npx webpack'

    let configPath = 'laravel-mix/setup/webpack.config.js'
    if (this.analyze) configPath = '../../setup/webpack.config.js'

    const webpackConfigPath = relative(this.application.appRoot, require.resolve(configPath))

    const script = [commandScript, `--config="${webpackConfigPath}"`].join(' ')

    const scriptEnv = {
      NODE_ENV: this.production ? 'production' : 'development',
      MIX_FILE: this.mixConfig,
    }

    this.runScript(script, scriptEnv)
  }
}
