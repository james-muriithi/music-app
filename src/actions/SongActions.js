import {
  ADD_SONGS,
  REMOVE_SONGS,
  SHUFFLE,
  TOGGLE_FAVORITE,
  ADD_FAVORITES,
} from "./types"

export const addSongs = songs => dispatch => {
  let filteredSongs = [...songs].filter(
    song =>
      (song.name && song.name.endsWith(".mp3")) || song.name.endsWith(".m4a")
  )
  if (songs.length) {
    dispatch({
      type: ADD_SONGS,
      songs: filteredSongs,
    })
  }
}

export const removeSong = id => dispatch => {
  dispatch({
    type: REMOVE_SONGS,
    id,
  })
}

export const shuffle = () => dispatch => {
  dispatch({
    type: SHUFFLE,
  })
}

export const setShuffle = shuffle => dispatch => {
  dispatch({
    type: SHUFFLE,
    shuffle,
  })
}

export const toggleFavorite = id => dispatch => {
  if (id !== -1) {
    dispatch({
      type: TOGGLE_FAVORITE,
      id,
    })
  }
}
