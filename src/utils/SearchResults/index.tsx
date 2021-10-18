import React from 'react'
import { dataForTV, dataForMovie } from '../../models'
import { List, Pagination } from 'antd'
import { PersonalPageCreation, getDesiredVariables } from '..'
import './SearchResults.module.scss'

type infoRequest = {
  results: dataForTV[] | dataForMovie[]
  totalPages?: number
  activePage?: number
}

type SearchResultsProps = {
  infoOnRequest: infoRequest
  typeRequest: string
  changePage?: (num: number) => void
}

export const SearchResults = ({ infoOnRequest, typeRequest, changePage }: SearchResultsProps) => {
  const { results, totalPages = 1, activePage: page = 1 } = infoOnRequest

  const films = results.length
    ? results.map((film) => {
        const {
          genres = [],
          id,
          overview,
          poster,
          release,
          title,
          vote = 0,
        } = getDesiredVariables(typeRequest, film)
        return (
          <PersonalPageCreation
            genres={genres}
            id={id}
            overview={overview}
            poster={poster}
            release={release}
            title={title}
            vote={vote}
            genreSheet={typeRequest}
          />
        )
      })
    : null

  return films ? (
    <>
      <List dataSource={films} renderItem={(item) => <List.Item extra={item} />} />
      <Pagination
        onChange={(event) => (changePage ? changePage(event) : () => null)}
        size="small"
        showSizeChanger
        hideOnSinglePage
        showQuickJumper
        total={totalPages * 10}
        defaultCurrent={+page}
      />
    </>
  ) : null
}
