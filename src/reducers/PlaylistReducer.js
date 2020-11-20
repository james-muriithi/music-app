import { NEW_PLAYLIST, ADD_SONG_TO_PLAYLIST } from "../actions/types"

const PlaylistReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_PLAYLIST:
      if (!Object.keys(state).includes(action.name)) {
        state[action.name] = []

        return state
      } else {
        alert("Playlist already exists")
      }
      return state

    case ADD_SONG_TO_PLAYLIST:
      if (Object.keys(state).includes(action.playlist)) {
        if (state[action.playlist]) {
          let playlistSongs = state[action.playlist]

          playlistSongs.unshift(action.song)

          state[action.playlist] = playlistSongs

          return state
        }

        return state
      } else {
        console.log(action.playlist)
        alert("Playlist does not exists")
      }
      return state

    default:
      return state
  }
}

export default PlaylistReducer
