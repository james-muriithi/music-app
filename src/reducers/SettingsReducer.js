import { REPEAT } from "../actions/types"

const initialState = {
  repeat: 0,
}

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPEAT: {
      return { ...state, repeat: action.id }
    }

    default:
      return state
  }
}

export default SettingsReducer
