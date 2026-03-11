interface CacheEntry {
  query: string
  lat: number
  lon: number
}

const cache: CacheEntry[] = []

export const findNearby = (query: string) => {
  return cache.find(c =>
    query.toLowerCase().includes(c.query.toLowerCase())
  )
}

export const addCache = (entry: CacheEntry) => {
  cache.push(entry)
}