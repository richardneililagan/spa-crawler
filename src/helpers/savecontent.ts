import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import chalk from 'chalk'

import { __jobs } from '../services/queue'

// :: ---

const SAVEDIR = process.env.PWD!

console.debug(
  chalk.yellow('[savecontent]'),
  'content directory:',
  path.resolve(SAVEDIR)
)

export async function saveContent(content: string, url: URL) {
  const { pathname } = url
  const filename = path.extname(pathname)
    ? pathname
    : path.join(pathname, 'index.html')

  const targetfile = path.join(SAVEDIR, filename.replace(/\.page$/, '.html'))
  if (fs.existsSync(targetfile)) return

  await mkdirp(path.dirname(targetfile))

  console.log(
    chalk.greenBright('[save]'),
    'saving content for:',
    chalk.cyanBright(filename),
    chalk.yellowBright(`${__jobs.length} jobs pending.`)
  )

  await fs.promises.writeFile(targetfile, content)
}
