import { NEW_PLAYLIST, ADD_SONG_TO_PLAYLIST } from "./types"

export const newPlaylist = name => dispatch => {
  dispatch({
    type: NEW_PLAYLIST,
    name,
  })
}

export const addSongToPlaylist = (playlist, song) => dispatch => {
  dispatch({
    type: ADD_SONG_TO_PLAYLIST,
    song,
    playlist,
  })
}
