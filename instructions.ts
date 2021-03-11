import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { join } from 'path'

const MIX_CONFIG_TEMPLATE_STUB = join(__dirname, './templates', 'webpack.mix.txt')

export default async function instructions(
  projectRoot: string,
  _: ApplicationContract,
  { logger, files }: typeof sinkStatic
) {
  const mixConfig = new files.MustacheFile(projectRoot, 'webpack.mix.js', MIX_CONFIG_TEMPLATE_STUB)
  if (mixConfig.exists()) {
    logger.action('create').skipped('webpack.mix.js', 'File already exists')
  } else {
    mixConfig.apply({}).commit()
    logger.action('create').succeeded('webpack.mix.js')
  }
}
