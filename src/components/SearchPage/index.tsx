import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Spin, Alert } from 'antd'
import { observer } from 'mobx-react-lite'
import classes from './searchPage.module.scss'
import { useStore } from '../../store/useStore'
import { SearchPanel } from './SearchPanel'
import { SearchResults } from '../../utils'

type requestOptions = {
  request?: string
  typeRequest?: string
  page?: string | number
}

export const SearchPage = observer(() => {
  const { movieStore } = useStore()
  const history = useHistory()
  const requestOptions: requestOptions = useParams()

  const { loading, error, nothingFound } = movieStore.requestStatus
  const { infoOnRequest } = movieStore
  const { results } = infoOnRequest

  const { request, typeRequest = 'movie', page = 1 } = requestOptions

  useEffect(() => {
    if (!results.length && typeRequest && request) {
      movieStore.getSearchRequest({ request, typeRequest }, page)
    }
  }, [request, typeRequest])

  const changePage = (page: number) => {
    if (request) {
      movieStore.getSearchRequest({ request, typeRequest }, page)
      history.push(`/search/${typeRequest}/${request}/${page}`)
    }
  }

  return (
    <div className={`${classes.searchPage}`}>
      <SearchPanel requestOptions={requestOptions} />
      {loading ? <Spin className={classes.searchPage_indicators} size="large" /> : null}
      {nothingFound ? (
        <Alert
          showIcon
          className={classes.searchPage__alert}
          message="Info"
          description={`No results were found for the query "${requestOptions.request}".`}
          type="info"
        />
      ) : null}
      {error ? (
        <Alert
          message="Error"
          type="error"
          className={`${classes.searchPage__alert} ${classes.searchPage__alert_error}`}
          showIcon
        />
      ) : null}
      {!loading && !nothingFound && !error && results.length ? (
        <SearchResults
          infoOnRequest={infoOnRequest}
          typeRequest={typeRequest}
          changePage={changePage}
        />
      ) : null}
    </div>
  )
})
