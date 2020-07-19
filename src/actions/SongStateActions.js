import { TOGGLE_PLAYING, PLAY_SONG } from "./types";

export const playSong = song_id => dispatch => {
    dispatch({
        type: PLAY_SONG,
        song_id
    })
}