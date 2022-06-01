import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './states/counterSlice'
import atomInfoReducer from './states/atomInfoSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    atomInfo: atomInfoReducer
  },
})