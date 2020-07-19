import { combineReducers } from "redux"
import SongsReducer from "./SongsReducer"
import SongStateReducer from "./SongStateReducer"

export default combineReducers({
  songs: SongsReducer,
  playState: SongStateReducer
})
