/*
 * adonis-mix-asset
 *
 * (c) Wahyu Budi Saputra <wahyubucil@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BaseCommand } from '@adonisjs/ace'
import { flags } from '@adonisjs/core/build/standalone'
import { spawn } from 'child_process'

/**
 * Base class to provide helpers for Mix commands
 */
export abstract class BaseMix extends BaseCommand {
  @flags.string({
    description: "The path to your Mix configuration file. Default: 'webpack.mix.js'",
  })
  public mixConfig = 'webpack.mix.js'

  @flags.boolean({ description: 'Enable progress reporting. Default: true' })
  public progress = true

  protected get isTesting() {
    return process.env.TESTING
  }

  protected get isTTY() {
    if (this.isTesting && process.env.IS_TTY !== undefined) {
      return process.env.IS_TTY === 'true'
    }

    if (this.isTesting && process.stdout.isTTY === undefined) {
      return true
    }

    return process.stdout.isTTY
  }

  protected runScript(script: string, scriptEnv: NodeJS.ProcessEnv) {
    if (this.isTesting) {
      process.stdout.write(JSON.stringify({ script, env: scriptEnv }))
      return
    }

    const child = spawn(script, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, ...scriptEnv },
    })

    child.on('exit', (code, signal) => {
      if (code === null) {
        code = signal === 'SIGINT' ? 130 : 1
      }

      process.exitCode = code
    })
  }
}
