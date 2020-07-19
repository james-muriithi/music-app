import { TOGGLE_PLAYING, PLAY_SONG, UPDATE_TIME } from "./types";
import mediaSession from '../utils/media-session';

export const playSong = song_id => dispatch => {
    mediaSession.playSong(song_id);
    dispatch({
        type: PLAY_SONG,
        song_id
    })
}

export const togglePlaying = song_id => dispatch => {
    dispatch({
        type: TOGGLE_PLAYING,
        song_id
    })
}