import UrlPattern from 'url-pattern'

export const extractHashAndKeyFromVSShareUrl = (
  url: string
): { hash: string; key: string } | null => {
  const urlWithPathParam = url.split('?').shift()
  if (!urlWithPathParam) {
    return null
  }

  const parser = new UrlPattern(
    '(http(s)\\://):subdomain.:environment.:domain.:tld(/api/v1/share/:hash)'
  )

  const key = url.split('?').pop()?.slice(4) || ''
  const hash = parser.match(urlWithPathParam)?.hash

  return { hash, key }
}
