import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { SearchResults } from '../../utils'
import { Alert, Spin } from 'antd'
import classes from '../SearchPage/searchPage.module.scss'

type requestOptions = {
  typeRequest: string
}

export const TopPage = observer(() => {
  const { typeRequest }: requestOptions = useParams()
  const { movieStore } = useStore()
  const { loading, error } = movieStore.requestStatus
  const { topList: results } = movieStore

  useEffect(() => {
    movieStore.getTop(typeRequest)
  }, [typeRequest])
  return (
    <>
      {loading ? <Spin className={classes.searchPage_indicators} size="large" /> : null}
      {error ? <Alert message="Error" type="error" showIcon /> : null}
      {!loading && !error && results.length ? (
        <SearchResults infoOnRequest={{ results }} typeRequest={typeRequest} />
      ) : null}
    </>
  )
})
