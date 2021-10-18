import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'antd'
import { format, parse } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { getClassName } from '..'
import { Tags } from '../Tags'
import noPoster from '../../assets/images/nullPoster/no-poster.jpg'
import classes from './personalPageCreation.module.scss'
import classesPersonality from './personality.module.scss'

type genres = {
  name: string
  id: number
}

type PersonalPageCreationProps = {
  genres?: number[] | genres[]
  id?: string
  overview?: string
  poster?: string
  release?: string
  title?: string
  vote?: number
  genreSheet: string
  personality?: boolean
}

export const PersonalPageCreation = ({
  genres = [],
  id,
  overview,
  poster,
  release,
  title,
  vote = 0,
  genreSheet,
  personality,
}: PersonalPageCreationProps) => {
  const urlForPoster = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/'
  return (
    <div
      key={id}
      className={`${classes.personalPageCreation} ${
        personality ? classesPersonality.personality : ''
      }`}
    >
      <Image
        className={classes.personalPageCreation__poster}
        src={poster ? `${urlForPoster}${poster}` : noPoster}
        alt="movie poster"
      />
      <div
        className={`${classes.personalPageCreation__header} ${classes.personalPageCreation__header_padding}`}
      >
        <Link to={`/${genreSheet}/${id}`} className={classes.personalPageCreation__heading}>
          {title}
        </Link>
        <p className={classes.personalPageCreation__release}>
          {release
            ? format(parse(release, 'yyyy-MM-dd', new Date()), 'MMMM d, y', {
                locale: enUS,
              })
            : 'no information'}
        </p>
        <Tags genres={genres} genreSheet={genreSheet} />
        {vote !== 0 ? (
          <span className={`${classes.personalPageCreation__vote} ${classes[getClassName(vote)]}`}>
            {vote}
          </span>
        ) : null}
      </div>
      <p
        className={`${classes.personalPageCreation__overview} ${classes.personalPageCreation__overview_padding}`}
      >
        {overview}
      </p>
    </div>
  )
}
