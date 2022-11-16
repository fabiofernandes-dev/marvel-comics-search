export interface CharactersResponse {
  id: number
  name: string
  description: string
  modified: string
  resourceURI: string
  urls: Url[]
  thumbnail: Thumbnail
  comics: Comics
  stories: Stories
  events: Events
  series: Series
}

export interface Url {
  type: string
  url: string
}

export interface Thumbnail {
  path: string
  extension: string
}

export interface Comics {
  available: number
  returned: number
  collectionURI: string
  items: any[]
}

export interface Stories {
  available: number
  returned: number
  collectionURI: string
  items: any[]
}

export interface Events {
  available: number
  returned: number
  collectionURI: string
  items: any[]
}

export interface Series {
  available: number
  returned: number
  collectionURI: string
  items: any[]
}
