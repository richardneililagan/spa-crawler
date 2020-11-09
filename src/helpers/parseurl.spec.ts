import { parseUrl } from './parseurl'

// :: ---

it('parses a URL correctly', () => {
  const specimen = 'https://aws.amazon.com'

  expect(() => {
    const url = parseUrl(specimen)
    expect(url).not.toBeNull()
  }).not.toThrow()
})

it('returns null on relative URLs', () => {
  const specimen = 'aws.amazon.com'

  const url = parseUrl(specimen)
  expect(url).toBeNull()
})

it('returns null if URL protocol is not http/s', () => {
  const specimen = 'ssh://aws.amazon.com'

  const url = parseUrl(specimen)
  expect(url).toBeNull()
})

it('returns null if URL base is different from the resultant', () => {
  const specimen = 'https://aws.amazon.com/ec2'
  const base = 'richardneililagan.com'

  const url = parseUrl(specimen, base)
  expect(url).toBeNull()
})

it('parses URL correctly with a matching provided base', () => {
  const specimen = 'https://aws.amazon.com/ec2'
  const base = 'https://aws.amazon.com'

  const url = parseUrl(specimen, base)
  expect(url).not.toBeNull()
})
