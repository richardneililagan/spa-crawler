import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import chalk from 'chalk'

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

  const targetfile = path.join(SAVEDIR, filename)
  await mkdirp(path.dirname(targetfile))

  console.log(
    chalk.greenBright('[save]'),
    'saving content for:',
    chalk.cyanBright(filename)
  )

  await fs.promises.writeFile(targetfile, content)
}
