import React from 'react'
import { Select } from 'antd'
import { useHistory } from 'react-router-dom'

const { Option } = Select

type requestOptions = {
  request?: string
  typeRequest?: string
  page?: string | number
}

type SearchPanelProps = {
  requestOptions: requestOptions
  onClear: () => void
}

export const SearchCategory = ({ requestOptions, onClear }: SearchPanelProps) => {
  const history = useHistory()
  const { typeRequest = 'movie' } = requestOptions
  const categories = [
    { name: 'Movies', type: 'movie', active: typeRequest === 'movie' },
    { name: 'TV show', type: 'tv', active: typeRequest === 'tv' },
  ]
  const [defaultValue] = categories.filter((category) => category.active)

  const onChangeType = (nameType: string) => {
    const [category] = categories.filter((elem) => elem.name === nameType)
    onClear()
    history.push(`/search/${category?.type}/`)
  }

  const option = categories.map((elem) => {
    const { name, type } = elem
    return (
      <Option key={type} value={name}>
        {name}
      </Option>
    )
  })

  return (
    <Select
      onChange={onChangeType}
      style={{ width: 120 }}
      defaultValue={defaultValue?.name}
      showSearch
      placeholder="Select category"
    >
      {option}
    </Select>
  )
}
