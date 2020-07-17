import { combineReducers } from "redux";
import SongsReducer from './SongsReducer';

export default combineReducers({
    songs: SongsReducer,
});