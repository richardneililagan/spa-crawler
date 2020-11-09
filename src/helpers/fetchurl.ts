import path from 'path'
import chalk from 'chalk'
import puppeteer from 'puppeteer'
import cheerio from 'cheerio'

import { parseUrl, sanitizeUrl } from './parseurl'
import { saveContent } from './savecontent'

// :: ---

const BROWSER = puppeteer.launch()

export interface fetchUrlProps {
  url: string
}

export interface pageRequest {
  id: number
  url: string
}

export async function fetchUrl(
  props: fetchUrlProps,
  done: Function
): Promise<void> {
  // console.info(
  //   chalk.yellow('[fetchurl]'),
  //   'fetching URL:',
  //   chalk.cyan(props.url)
  // )

  const __url = parseUrl(props.url)
  if (!__url) return

  const __base = `${__url.protocol}//${__url.host}`

  // const pagerequests: pageRequest[] = []
  const browser = await BROWSER
  const page = await browser.newPage()

  // page.on('request', async (request: any) => {
  //   const { _requestId: id, _url: url } = request
  //   const payload = { id, url }
  //   pagerequests.push(payload)
  // })

  // page.on('response', async (response: any) => {
  //   const { _request } = response
  //   const { _requestId: id, _url: url } = _request

  //   const requestIndex = pagerequests.findIndex((element) => element.id === id)
  //   if (requestIndex >= 0) pagerequests.splice(requestIndex, 1)
  // })

  try {
    await page.goto(props.url, { waitUntil: 'networkidle0', timeout: 0 })

    const content = await page.content()
    await saveContent(content, __url)

    page.close()
    done(null, parseLinks(content, __base))
  } catch (err) {
    page.close()
    done(err)
  }
}

function parseLinks(content: string, base: string): Set<string> {
  const $ = cheerio.load(content)
  const links = $('a[href]')
  // console.debug(chalk.yellow('[fetchurl]'), 'Links found:', links.length)

  const $urls = $('a[href]')
    .toArray()
    .map((link) => {
      // :: this should filter out any URLs encountered that are not
      //    within the initial entrypoint URL host
      const url = parseUrl(link.attribs['href'], base)

      return url ? sanitizeUrl(url) : null
    })
    .filter((url) => !!url)
    .filter((url) => ['.pdf'].indexOf(path.extname(url!)) < 0)

  const $stylesheets = $('link[rel=stylesheet]')
    .toArray()
    .map((link) => {
      const url = parseUrl(link.attribs['href'], base)
      return url ? sanitizeUrl(url) : null
    })
    .filter((url) => !!url)

  return new Set([...$urls, ...$stylesheets]) as Set<string>
}
