import * as React from 'react'
import {
  Provider
} from 'react-redux'
import SignIn from './containers/SignIn'

import store from './redux/store'

function App () {
  return (
    < Provider store={store}>
    <SignIn />
   </Provider>
  )
}

export default App
