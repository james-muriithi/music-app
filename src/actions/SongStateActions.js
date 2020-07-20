import { TOGGLE_PLAYING, PLAY_SONG } from "./types"
import mediaSession from "../utils/media-session"

export const playSong = song_id => dispatch => {
  mediaSession.playSong(song_id)
  dispatch({
    type: PLAY_SONG,
    song_id,
  })
}

export const togglePlaying = () => dispatch => {
  dispatch({
    type: TOGGLE_PLAYING,
  })
}
