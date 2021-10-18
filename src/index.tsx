import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './components/App/App'
import { StoreContext } from './store/StoreContext'
import { RootStore } from './store/RootStore'

const store = new RootStore()

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root'),
)
