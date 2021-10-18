import React from 'react'
import { useHistory } from 'react-router-dom'
import { Input } from 'antd'
import { useStore } from '../../../store/useStore'
import { SearchCategory } from './SearchCategory'
import classes from './searchPanel.module.scss'

const { Search } = Input

type requestOptions = {
  request?: string
  typeRequest?: string
  page?: string | number
}

type SearchPanelProps = {
  requestOptions: requestOptions
}

export const SearchPanel = ({ requestOptions }: SearchPanelProps) => {
  const history = useHistory()
  const { movieStore } = useStore()
  const { typeRequest = 'movie', page = 1, request } = requestOptions

  const onSubmit = (request: string) => {
    movieStore.getSearchRequest({ request, typeRequest }, page)
    history.push(`/search/${typeRequest}/${request}/${page}`)
  }

  return (
    <div className={classes.searchPanel}>
      <Search
        defaultValue={request}
        placeholder="Type to search..."
        allowClear
        onSearch={(request) => onSubmit(request)}
      />
      <SearchCategory requestOptions={requestOptions} onClear={movieStore.clearInfoRequest} />
    </div>
  )
}
