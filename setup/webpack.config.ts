/*
 * adonis-mix-asset
 *
 * (c) Wahyu Budi Saputra <wahyubucil@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const webpackConfig = require('laravel-mix/setup/webpack.config.js') as () => Promise<Configuration>

export default async () => {
  const config = await webpackConfig()
  config.plugins?.push(new BundleAnalyzerPlugin())

  return config
}
