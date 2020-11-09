import chalk from 'chalk'
import Queue from 'better-queue'

import { parseUrl, sanitizeUrl } from '../helpers/parseurl'
import { fetchUrl, fetchUrlProps } from '../helpers/fetchurl'

// :: ---

const __history: { [key: string]: boolean } = {}
export const __jobs = new Queue<fetchUrlProps>(fetchUrl, {
  concurrent: 6,
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
    },
    (err, result: Set<string>) => {
      result.forEach(addJob)

      if (__jobs.length > 1 && processWatcher) {
        clearTimeout(processWatcher)
      } else if (__jobs.length <= 1) {
        processWatcher = setTimeout(() => {
          // :: wait for 5 sec on queue finish to exit
          console.log(
            chalk.yellow('[process]'),
            'task completed.',
            chalk.cyanBright(__jobs.getStats().total),
            'pages / assets fetched.'
          )
        }, 5000)
      }
    }
  )
}
