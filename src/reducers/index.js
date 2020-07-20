import { combineReducers } from "redux"
import SongsReducer from "./SongsReducer"
import SongStateReducer from "./SongStateReducer"
import SettingsReducer from "./SettingsReducer"

export default combineReducers({
  songs: SongsReducer,
  playState: SongStateReducer,
  settings: SettingsReducer,
})
