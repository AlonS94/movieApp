import React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'
import { Header } from '../Header'
import { SearchPage } from '../SearchPage'
import { PersonalPageResults } from '../PersonalPageResults'
import { TopPage } from '../TopPage'

export const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={SearchPage} exact />
        <Route path="/search/:typeRequest/:request?/:page?" component={SearchPage} />
        <Route path="/top/:typeRequest/" component={TopPage} />
        <Route path="/:typeRequest/:id" component={PersonalPageResults} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </>
  )
}
