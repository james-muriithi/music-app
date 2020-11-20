import { applyMiddleware, createStore, compose } from "redux"
import thunk from "redux-thunk"
import * as LocalForage from "localforage"
import {
  ADD_SONGS,
  ADD_SONG_TO_PLAYLIST,
  NEW_PLAYLIST,
  REPEAT,
  SET_SHUFFLE,
  TOGGLE_FAVORITE,
} from "../actions/types"

import rootReducer from "../reducers"

let initialState = {}
const middleware = [thunk]
// const globalWindow = typeof window !== "undefined" && window

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
    applyMiddleware(...middleware)
    //   globalWindow &&
    //   globalWindow.__REDUX_DEVTOOLS_EXTENSION__ &&
    //   globalWindow.__REDUX_DEVTOOLS_EXTENSION__()
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
  if (state && state.favorites) {
    const favorites = state.favorites
    favorites.map(id => store.dispatch({ type: TOGGLE_FAVORITE, id }))
  }
  if (state && state.playlists) {
    const playlists = state.playlists
    Object.keys(playlists).map(name => {
      store.dispatch({ type: NEW_PLAYLIST, name })

      console.log(name)

      playlists[name].map(song =>
        store.dispatch({ type: ADD_SONG_TO_PLAYLIST, song, playlist: name })
      )
    })
  }
  return {}
})

export default store
