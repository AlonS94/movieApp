import React from 'react'
import { Link } from 'react-router-dom'
import classes from './topNavigation.module.scss'

export const TopNavigation = () => {
  const listOption = [
    { name: 'movie', label: 'movies' },
    { name: 'tv', label: 'TV show' },
  ]
  const list = listOption.map(({ name, label }) => (
    <Link key={name} to={`/top/${name}`}>
      {label}
    </Link>
  ))

  return (
    <div className={classes.topNavigation}>
      <span>Top 10: </span>
      {list}
    </div>
  )
}
