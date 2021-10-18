import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/useStore'
import { PersonalPageCreation, getDesiredVariables } from '../../utils'
import { Alert, Spin } from 'antd'
import classes from '../SearchPage/searchPage.module.scss'

type requestOptions = {
  id: string
  typeRequest: string
}

export const PersonalPageResults = observer(() => {
  const { movieStore } = useStore()
  const { id, typeRequest: genreSheet }: requestOptions = useParams()
  const { loading, error } = movieStore.requestStatus

  useEffect(() => {
    movieStore.getIndividualPage(genreSheet, id)
  }, [id, genreSheet])

  const { infoIndividualPage } = movieStore

  const page = () => {
    const {
      genres = [],
      id,
      overview,
      poster,
      release,
      title,
      vote = 0,
    } = getDesiredVariables(genreSheet, infoIndividualPage!)
    return (
      <PersonalPageCreation
        genres={genres}
        id={id}
        overview={overview}
        poster={poster}
        release={release}
        title={title}
        vote={vote}
        genreSheet={genreSheet}
        personality
      />
    )
  }

  return (
    <>
      {loading ? <Spin className={classes.searchPage_indicators} size="large" /> : null}
      {error ? (
        <Alert
          message="Error"
          type="error"
          className={`${classes.searchPage__alert} ${classes.searchPage__alert_error}`}
          showIcon
        />
      ) : null}
      {infoIndividualPage && !loading && !error ? page() : null}
    </>
  )
})
