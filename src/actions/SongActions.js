import { ADD_SONGS, REMOVE_SONGS, PLAY_SONG, TOGGLE_PLAYING } from "./types"

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

export const playSong = id => dispatch => {
  dispatch({
    type: PLAY_SONG,
    id,
  })
}

export const togglePlaying = () => dispatch => {
  dispatch({
    type: TOGGLE_PLAYING,
  })
}
