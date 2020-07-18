import { applyMiddleware, createStore, compose } from "redux";
import thunk from 'redux-thunk';
import * as LocalForage from 'localforage';

import rootReducer from '../reducers';

let initialState = {}
const middleware = [ thunk ]
const globalWindow = typeof window !== "undefined" && window

LocalForage.getItem('mySongs').then((state) => {
    if (state !== null) {
        initialState = state
    }
});


const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        globalWindow && globalWindow.__REDUX_DEVTOOLS_EXTENSION__ && globalWindow.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

store.subscribe(() => {
    LocalForage.setItem("mySongs", store.getState())
})

export default store;