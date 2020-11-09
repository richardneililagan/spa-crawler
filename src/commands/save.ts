import path from 'path'
import chalk from 'chalk'
import { Command, flags } from '@oclif/command'

import { addJob } from '../services/queue'

// :: ---

export default class Save extends Command {
  async run() {
    const { args, flags } = this.parse(Save)

    console.info(
      chalk.yellow('[save]'),
      'Saving website. Entrypoint is:',
      chalk.cyan(args.entrypoint)
    )

    addJob(args.entrypoint)
    // :: TODO
  }
}

Save.description = 'Save a website a locally.'

Save.args = [
  {
    name: 'entrypoint',
    required: true,
    description: 'URL from where to start the crawl',
  },
]

Save.flags = {
  // :: if specified, the crawl process should not recursively follow links / URLs
  //    found in the documents it crawls.
  nofollow: flags.boolean({
    description: 'Do not follow links found in the documents.',
  }),
}
