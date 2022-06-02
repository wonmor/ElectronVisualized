import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './states/counterSlice'
import atomInfoReducer from './states/atomInfoSlice'

export default configureStore({
  /*
  This function dictates the behaviour of a React-Redux reducer, which  takes an action and the previous state of the application and returns the new state

  Parameters
  ----------
  None

  Returns
  -------
  None
  */
  reducer: {
    counter: counterReducer,
    atomInfo: atomInfoReducer
  },
})