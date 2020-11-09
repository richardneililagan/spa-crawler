import chalk from 'chalk'
import Queue from 'better-queue'

import { parseUrl, sanitizeUrl } from '../helpers/parseurl'
import { fetchUrl, fetchUrlProps } from '../helpers/fetchurl'

// :: ---

const __history: { [key: string]: boolean } = {}
export const __jobs = new Queue<fetchUrlProps>(fetchUrl, {
  id: 'url',
  concurrent: 16,
})

__jobs.on('task_finish', (id: string, results: Set<string>, stats: any) => {
  console.debug(chalk.greenBright('[task finish]'), 'Task ID:', id)
  ;(results || []).forEach(addJob)
})

__jobs.on('task_failed', (id: string, err: any, stats: any) => {
  console.debug(
    chalk.redBright('[task error]'),
    'Task ID:',
    id,
    chalk.redBright(err)
  )
})

__jobs.on('drain', () => {
  console.debug('done ###')
})

// :: ---

let processWatcher: any = null

export async function addJob(urlstring: string): Promise<void> {
  const url = parseUrl(urlstring)
  if (!url) throw new Error(`Invalid URL string: ${urlstring}`)

  // :: by default ignores querystrings and hash fragments.
  const target = sanitizeUrl(url)
  if (__history[target]) return

  // :: valid new job from this point
  __history[target] = true
  __jobs.push(
    {
      url: target,
    }
    // async (err, result: Set<string>) => {
    //   // Promise.all((result || []).map(addJob))
    //   await Promise.all([...(result || [])].map(addJob))

    //   if (__jobs.length > 1 && processWatcher) {
    //     clearTimeout(processWatcher)
    //   } else if (__jobs.length <= 1) {
    //     processWatcher = setTimeout(() => {
    //       // :: wait for 5 sec on queue finish to exit
    //       console.log(
    //         chalk.yellow('[process]'),
    //         'task completed.',
    //         chalk.cyanBright(__jobs.getStats().total),
    //         'pages / assets fetched.'
    //       )
    //     }, 5000)
    //   }
    // }
  )
}
