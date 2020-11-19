import { combineReducers } from "redux"
import SongsReducer from "./SongsReducer"
import SongStateReducer from "./SongStateReducer"
import SettingsReducer from "./SettingsReducer"
import FavoritesReducer from "./FavoritesReducer"
import PlaylistReducer from "./PlaylistReducer"

export default combineReducers({
  songs: SongsReducer,
  playState: SongStateReducer,
  favorites: FavoritesReducer,
  settings: SettingsReducer,
  playlists: PlaylistReducer,
})
