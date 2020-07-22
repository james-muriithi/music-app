import { TOGGLE_FAVORITE } from "../actions/types"

const SongStateReducer = (state = [], action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existed_song = state.find(id => action.id === id)
      if (existed_song) {
        return state.filter(id => id !== action.id)
      }

      return [...state, action.id]

    default:
      return state
  }
}

export default SongStateReducer
