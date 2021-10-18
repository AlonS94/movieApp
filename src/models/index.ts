/* eslint-disable camelcase */
export type genres = {
  name: string
  id: number
}

export type dataForMovie = {
  genre_ids?: number[]
  id?: string
  overview?: string
  poster_path?: string
  release_date?: string
  title?: string
  vote_average?: number
  genres?: genres[]
}

export type dataForTV = {
  genre_ids?: number[]
  id?: string
  overview?: string
  poster_path?: string
  first_air_date?: string
  name?: string
  vote_average?: number
  genres?: genres[]
}

export type format = {
  genres?: number[] | genres[]
  id?: string
  overview?: string
  poster?: string
  release?: string
  title?: string
  vote?: number
}
