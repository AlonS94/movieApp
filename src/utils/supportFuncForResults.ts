import { format, dataForTV, dataForMovie } from '../models'

export const getClassName = (vote: number) => {
  if (vote <= 3) {
    return 'awful-rating'
  }
  if (vote <= 5) {
    return 'bad-rating'
  }
  if (vote <= 7) {
    return 'normal-rating'
  }
  return 'good-rating'
}

const getVariablesForMovie = (obj: dataForMovie): format => ({
  genres: obj.genre_ids || obj.genres,
  id: obj.id,
  overview: obj.overview,
  poster: obj.poster_path,
  release: obj.release_date,
  title: obj.title,
  vote: obj.vote_average,
})

const getVariablesForTV = (obj: dataForTV): format => ({
  genres: obj.genre_ids || obj.genres,
  id: obj.id,
  overview: obj.overview,
  poster: obj.poster_path,
  release: obj.first_air_date,
  title: obj.name,
  vote: obj.vote_average,
})

export function getDesiredVariables(typeRequest: string, obj: dataForTV | dataForMovie) {
  switch (typeRequest) {
    case 'movie':
      return getVariablesForMovie(obj)
    case 'tv':
      return getVariablesForTV(obj)
    default:
      return {}
  }
}
