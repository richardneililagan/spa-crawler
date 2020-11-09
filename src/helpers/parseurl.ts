import chalk from 'chalk'
import { URL } from 'url'

// :: ---

const ALLOWED_PROTOCOLS = ['http:', 'https:']

export function parseUrl(__url: string, base?: string): URL | null {
  try {
    const url = new URL(__url, base)
    if (base && url.host !== new URL(base).host) {
      return null
    }

    return ALLOWED_PROTOCOLS.includes(url.protocol) ? url : null
  } catch (err) {
    console.error('Error parsing URL:', err)
    return null
  }
}

export function sanitizeUrl(url: URL): string {
  // :: by default ignores querystrings and hash fragments
  const sanitized = `${url.origin}${url.pathname}`
  return sanitized
}
