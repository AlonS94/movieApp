import axios from 'axios'

const link = 'https://api.themoviedb.org/3/'

const keyAPI = 'a7562da37378ab7dbc9b130ebb39106a'

type searchOption = {
  request: string
  typeRequest: string
}

export class searchMovie {
  static getSearchRequest = (searchOption: searchOption, page: string | number = 1) =>
    axios(
      `${link}search/${searchOption.typeRequest}?api_key=${keyAPI}&query=${searchOption.request}&page=${page}`,
    )

  static getIndividualPage = (typeRequest: string, id: string) =>
    axios(`${link}${typeRequest}/${id}?api_key=${keyAPI}`)

  static getTop = (typeRequest = 'movie') =>
    axios(`${link}${typeRequest}/top_rated?api_key=${keyAPI}`)
}
