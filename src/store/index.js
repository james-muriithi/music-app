import { applyMiddleware, createStore, compose } from "redux"
import thunk from "redux-thunk"
import * as LocalForage from "localforage"
import { ADD_SONGS } from "../actions/types"

import rootReducer from "../reducers"

let initialState = {}
const middleware = [thunk]
const globalWindow = typeof window !== "undefined" && window

export const getInitialState = () => {
  return LocalForage.getItem("mySongs").then(state => {
    if (state !== null) {
      return state
    }
    return {}
  })
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    globalWindow &&
      globalWindow.__REDUX_DEVTOOLS_EXTENSION__ &&
      globalWindow.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.subscribe(() => {
  LocalForage.setItem("mySongs", store.getState())
})

LocalForage.getItem("mySongs").then(state => {
  if (state !== null && state.songs) {
    store.dispatch({ type: ADD_SONGS, songs: state.songs })
  }
  return {}
})

export default store
