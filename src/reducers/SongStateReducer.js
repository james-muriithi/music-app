import { TOGGLE_PLAYING, PLAY_SONG } from "../actions/types"

const initalState = {
  playing: false,
  songId: -1,
  currentTime: 0,
}

const SongStateReducer = (state = initalState, action) => {
  switch (action.type) {
    case PLAY_SONG:
      return { playing: true, songId: action.song_id }

    case TOGGLE_PLAYING:
      return Object.assign({}, state, { playing: !state.playing })

    default:
      return state
  }
}

export default SongStateReducer
