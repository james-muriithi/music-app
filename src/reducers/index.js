import { combineReducers } from "redux";
import SongsReducer from './songsReducer';

export default combineReducers({
    songs: SongsReducer,
});