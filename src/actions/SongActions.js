import { ADD_SONGS, REMOVE_SONGS, PLAY_SONG, TOGGLE_PLAYING} from './types';

export const addSong = songs => dispatch => {
    dispatch({
        type: ADD_SONGS,
        songs
    })
} 

export const removeSong = id => dispatch => {
    dispatch({
        type: REMOVE_SONGS,
        id
    })
} 

export const playSong = id => dispatch => {
    dispatch({
        type: PLAY_SONG,
        id
    })
}

export const togglePlaying = () => dispatch => {
    dispatch({
        type: TOGGLE_PLAYING
    })
}