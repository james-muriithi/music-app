import { NEW_PLAYLIST } from "../actions/types";

const PlaylistReducer = (state = [], action) => {
    switch (action.type) {
        case NEW_PLAYLIST:  
            if (!state.includes(action.name)) {
                return [ action.name, ...state ];
            }else{
                alert("Playlist already exists");
            }
            return state;

        default:
            return state

    }
}

export default PlaylistReducer