import chalk from 'chalk'
import Queue from 'better-queue'

import { parseUrl, sanitizeUrl } from '../helpers/parseurl'
import { fetchUrl, fetchUrlProps } from '../helpers/fetchurl'

// :: ---

const __history: { [key: string]: boolean } = {}
const __jobs = new Queue<fetchUrlProps>(fetchUrl, {
  concurrent: 3,
})

// :: ---

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
    (_, result: Set<string>) => {
      // :: callback when job is done
      console.debug(
        chalk.yellow('[queue]'),
        'Job completed.',
        'Links found:',
        chalk.cyanBright(result.size)
      )

      result.forEach((url) => {
        console.debug(chalk.magentaBright('[follow]'), url)
        addJob(url)
      })
    }
  )

  console.debug(`${chalk.yellow('[queue]')} added URL: ${chalk.cyan(target)}`)
}
