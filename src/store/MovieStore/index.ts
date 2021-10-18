/* eslint-disable camelcase */
import { makeAutoObservable } from 'mobx'
import { searchMovie } from '../../dataAPI'

type searchOption = {
  request: string
  typeRequest: string
}

type genres = {
  name: string
  id: number
}

type page = {
  genres?: genres[]
  id?: string
  overview?: string
  poster?: string
  release?: string
  title?: string
  vote?: number
}

export class MovieStore {
  infoOnRequest = {
    totalPages: 0,
    results: [],
    activePage: 1,
  }

  topList = []

  infoIndividualPage: null | page = null

  requestStatus = { loading: false, error: false, nothingFound: false }

  constructor() {
    makeAutoObservable(this)
  }

  clearRequestStatus = () => {
    this.requestStatus = { loading: false, error: false, nothingFound: false }
  }

  clearInfoRequest = () => {
    this.infoOnRequest = { totalPages: 0, results: [], activePage: 1 }
  }

  getSearchRequest = (request: searchOption, page: string | number = 1) => {
    this.requestStatus = { loading: true, error: false, nothingFound: false }
    searchMovie
      .getSearchRequest(request, page)
      .then((info) => {
        const { total_pages, results } = info.data
        this.infoOnRequest = {
          totalPages: total_pages,
          results,
          activePage: +page,
        }
        this.requestStatus = !results.length
          ? { loading: false, error: false, nothingFound: true }
          : { loading: false, error: false, nothingFound: false }
      })
      .catch(() => {
        this.requestStatus = { loading: false, error: true, nothingFound: false }
      })
  }

  getIndividualPage = (typeRequest: string, id: string) => {
    this.infoIndividualPage = null
    this.requestStatus = { loading: true, error: false, nothingFound: false }
    searchMovie
      .getIndividualPage(typeRequest, id)
      .then((info) => {
        this.infoIndividualPage = info.data
        this.requestStatus = { loading: false, error: false, nothingFound: false }
      })
      .catch(() => {
        this.requestStatus = { loading: false, error: true, nothingFound: false }
      })
  }

  getTop = (typeRequest: string) => {
    this.topList = []
    this.requestStatus = { loading: true, error: false, nothingFound: false }
    searchMovie
      .getTop(typeRequest)
      .then((info) => {
        const { results } = info.data
        this.topList = results.slice(0, 10)
        this.requestStatus = { loading: false, error: false, nothingFound: false }
      })
      .catch(() => {
        this.requestStatus = { loading: false, error: true, nothingFound: false }
      })
  }
}
