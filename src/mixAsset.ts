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

// Reference: https://github.com/laravel/framework/blob/990e0e7/src/Illuminate/Foundation/Mix.php
export function mixAsset(
  application: ApplicationContract,
  manifest: Record<string, string>,
  path: string
) {
  if (!path) return

  if (!path.startsWith('/')) path = '/' + path

  if (!application.inProduction && existsSync(application.publicPath('hot'))) {
    const url = readFileSync(application.publicPath('hot'), 'utf-8').trim()

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url.substring(url.indexOf(':') + 1) + path
    }

    return '//localhost:8080' + path
  }

  if (!manifest[path]) throw new Error(`Unable to locate Mix file: ${path}.`)
  return manifest[path]
}
