import { REPEAT, SHUFFLE, SET_SHUFFLE } from "../actions/types"

const initialState = {
  repeat: 0,
  shuffle: false,
}

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPEAT: {
      return { ...state, repeat: action.id }
    }

    case SHUFFLE: {
      return { ...state, shuffle: !state.shuffle }
    }

    case SET_SHUFFLE: {
      return { ...state, shuffle: action.shuffle }
    }

    default:
      return state
  }
}

export default SettingsReducer
