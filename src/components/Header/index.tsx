import React from 'react'
import { useHistory } from 'react-router-dom'
import { TopNavigation } from './TopNavigation'
import { useStore } from '../../store/useStore'
import classes from './header.module.scss'
import { HomeOutlined } from '@ant-design/icons'

export const Header = () => {
  const { movieStore } = useStore()
  const history = useHistory()

  const onStartPage = () => {
    movieStore.clearRequestStatus()
    history.push('/')
  }

  return (
    <header className={`${classes.header} ${classes.header_padding} ${classes.header_margin}`}>
      <HomeOutlined onClick={onStartPage} />
      <TopNavigation />
    </header>
  )
}
