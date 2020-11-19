import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './app/layout/styles.css'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './app/layout/App'
import * as serviceWorker from './serviceWorker'
import configureStore from './app/store/configureStore'
import ScrollToTop from './components/common/ScrollToTop'

// eslint-disable-next-line no-console
console.log(`The app is running on ${process.env.REACT_APP_ENV}`)

const history = createBrowserHistory()

const store = configureStore()

const rootEl = document.getElementById('root')

const app = (
  <Provider store={store}>
    <Router history={history}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>
)

ReactDOM.render(app, rootEl)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

export default history
