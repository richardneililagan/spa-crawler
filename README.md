crawler
=======



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/crawler.svg)](https://npmjs.org/package/crawler)
[![Downloads/week](https://img.shields.io/npm/dw/crawler.svg)](https://npmjs.org/package/crawler)
[![License](https://img.shields.io/npm/l/crawler.svg)](https://github.com/richardneililagan/puppeteer-crawler/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g crawler
$ crawler COMMAND
running command...
$ crawler (-v|--version|version)
crawler/0.1.0 darwin-x64 node-v12.19.0
$ crawler --help [COMMAND]
USAGE
  $ crawler COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`crawler hello [FILE]`](#crawler-hello-file)
* [`crawler help [COMMAND]`](#crawler-help-command)

## `crawler hello [FILE]`

describe the command here

```
USAGE
  $ crawler hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ crawler hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/richardneililagan/puppeteer-crawler/blob/v0.1.0/src/commands/hello.ts)_

## `crawler help [COMMAND]`

display help for crawler

```
USAGE
  $ crawler help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
