import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import initialState from './initialState'

import reducers from './reducers'
import ScheduleApp from './containers/ScheduleApp'

const logger = createLogger()

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(
    thunk,
    logger
  )
)

// Required by some material-react components
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin()

ReactDom.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ScheduleApp />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app-container')
)