import { applyMiddleware, createStore, compose } from "redux"
import thunk from "redux-thunk"
import * as LocalForage from "localforage"
import { ADD_SONGS, REPEAT, SET_SHUFFLE } from "../actions/types"

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
  if (state && state.settings && state.settings.repeat) {
    store.dispatch({ type: REPEAT, id: state.settings.repeat })
  }
  if (state && state.settings && state.settings.shuffle) {
    store.dispatch({ type: SET_SHUFFLE, shuffle: state.settings.shuffle })
  }
  return {}
})

export default store
