import { ADD_SONGS, REMOVE_SONGS } from "../actions/types"

const SongsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_SONGS:
      return [...state, ...action.songs]

    case REMOVE_SONGS:
      return state.filter((_, index) => index !== action.id)

    default:
      return state
  }
}

export default SongsReducer
