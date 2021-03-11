import { BaseCommand, flags } from '@adonisjs/core/build/standalone'
import { spawn } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

export default class MixWatch extends BaseCommand {
  public static commandName = 'mix:watch'
  public static description = 'Build and watch files for changes'
  public static settings = {
    stayAlive: true,
  }

  @flags.boolean({ description: 'Enable hot reloading', default: false })
  public hot: boolean

  @flags.string({
    description:
      "The path to your Mix configuration file. The default is your root 'webpack.mix.js'",
    default: 'webpack.mix.js',
  })
  public mixConfig: string

  public async run() {
    const webpackConfigPath = require.resolve('laravel-mix/setup/webpack.config.js')
    if (!existsSync(webpackConfigPath)) {
      this.logger.error('Please install Laravel Mix')
      return
    }

    const mixConfigPath = join(this.application.cliCwd!, this.mixConfig)
    if (!existsSync(mixConfigPath)) {
      this.logger.error(`The Mix configuration file '${this.mixConfig}' is not found`)
      return
    }

    let commandScript: string
    if (this.hot) commandScript = 'npx webpack serve --hot'
    else {
      if (this.isTTY()) commandScript = 'npx webpack --progress --watch'
      else commandScript = 'npx webpack --watch'
    }

    const script = [
      'npx cross-env NODE_ENV=development',
      `MIX_FILE=${this.mixConfig}`,
      commandScript,
      `--config=${webpackConfigPath}`,
    ].join(' ')

    if (this.isTesting()) {
      process.stdout.write(script)
      return
    }

    const child = spawn(script, {
      stdio: 'inherit',
      shell: true,
    })

    child.on('exit', (code) => {
      if (code) process.exitCode = code
    })
  }

  private isTesting() {
    return process.env.TESTING
  }

  private isTTY() {
    if (this.isTesting() && process.env.IS_TTY !== undefined) {
      return process.env.IS_TTY === 'true'
    }

    if (this.isTesting() && process.stdout.isTTY === undefined) {
      return true
    }

    return process.stdout.isTTY
  }
}
