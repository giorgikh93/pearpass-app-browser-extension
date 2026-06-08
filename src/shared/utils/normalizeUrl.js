/**
 * @param {string} urlString
 * @param defaultToSecureProtocol
 * @returns {string | null}
 */
export const normalizeUrl = (urlString, defaultToSecureProtocol = true) => {
  try {
    // Ensure there’s a protocol (default to https:// if missing)
    const defaultProtocolPrefix = defaultToSecureProtocol
      ? 'https://'
      : 'http://'
    const withProtocol = /^https?:\/\//i.test(urlString)
      ? urlString
      : `${defaultProtocolPrefix}${urlString}`
    const url = new URL(withProtocol)

    // Lower‑case the protocol and hostname
    const protocol = url.protocol.toLowerCase()
    const hostname = url.hostname.toLowerCase()

    // Include port only if non‑standard
    const port =
      url.port && url.port !== '80' && url.port !== '443' ? `:${url.port}` : ''

    // Strip any trailing slash from the path
    const path = url.pathname.replace(/\/$/, '')

    // Rebuild the normalized URL
    return `${protocol}//${hostname}${port}${path}`
  } catch {
    // invalid URL
    return null
  }
}
