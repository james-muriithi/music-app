import {NEW_PLAYLIST} from './types'

export const newPlaylist = name => dispatch  => {
    dispatch({
        type: NEW_PLAYLIST,
        name
    })
}