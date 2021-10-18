import React from 'react'
import { Tag } from 'antd'
import { filmGenres, TVGenres } from '../index'
import classes from './tags.module.scss'

type genres = {
  name: string
  id: number
}

type TagsProps = {
  genreSheet: string
  genres: number[] | genres[]
}

export const Tags = ({ genres, genreSheet }: TagsProps) => {
  const arrGenres = genreSheet === 'movie' ? filmGenres : TVGenres
  const getGenres = () => {
    const arrayTags = genres.map((id) => arrGenres.find((elem) => elem.id === id))
    return arrayTags.map((tag) => tag?.name)
  }

  const getPersonalPageTags = (arrGenres: number[] | genres[]) => {
    if (typeof arrGenres[0] === 'number') {
      return getGenres().map((tag) => <Tag key={tag}>{tag}</Tag>)
    }
    return genres.map((tag) => (
      <Tag key={typeof tag !== 'number' ? tag?.id : null}>
        {typeof tag !== 'number' ? tag?.name : null}
      </Tag>
    ))
  }

  const tags = genres.length ? getPersonalPageTags(genres) : null

  return <div className={classes.tags}>{tags}</div>
}
