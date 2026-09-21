const productionMediaBase = 'https://media.avinashpatel.in'

const configuredMediaBase = import.meta.env.VITE_MEDIA_BASE_URL?.replace(/\/$/, '')

export function mediaUrl(path) {
  const cleanPath = path.replace(/^\//, '')

  if (configuredMediaBase) {
    return `${configuredMediaBase}/${cleanPath}`
  }

  if (import.meta.env.DEV) {
    if (cleanPath.startsWith('images/')) {
      return `/src/assets/${cleanPath}`
    }
    return `/${cleanPath}`
  }

  return `${productionMediaBase}/${cleanPath}`
}
