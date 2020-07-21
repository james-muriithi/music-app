import { TOGGLE_PLAYING, PLAY_SONG } from "../actions/types"

let store
const globalNavigator = typeof navigator !== "undefined" && navigator
const mediaSessionEnabled = globalNavigator
  ? "mediaSession" in globalNavigator
  : false
const addNewSong = id => {
  const state = store.getState()
  const title = state.songs[id].name
  let artist = "Unknown"
  if (title.indexOf(" - ") !== -1) {
    artist = title.split(" - ")[0]
  }
  globalNavigator.mediaSession.metadata = new window.MediaMetadata({
    title,
    artist,
    album: "Unknown Albumn",
    artwork: [
      {
        src: require("../images/favicon.png"),
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: require("../images/favicon.png"),
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: require("../images/favicon.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: require("../images/favicon.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  })
}

const addActionListeners = () => {
  globalNavigator.mediaSession.setActionHandler("previoustrack", () => {
    if (store) {
      const state = store.getState()
      const prevId =
        state.playState.songId === 0
          ? state.songs.length - 1
          : state.playState.songId - 1
      store.dispatch({
        type: PLAY_SONG,
        song_id: prevId,
      })
      if (mediaSessionEnabled) {
        addNewSong(prevId)
      }
    }
  })

  globalNavigator.mediaSession.setActionHandler("nexttrack", () => {
    if (store) {
      const state = store.getState()
      const nextId = (state.playState.songId + 1) % state.songs.length
      store.dispatch({
        type: PLAY_SONG,
        song_id: nextId,
      })
      if (mediaSessionEnabled) {
        addNewSong(nextId)
      }
    }
  })

  globalNavigator.mediaSession.setActionHandler("play", () => {
    if (store) store.dispatch({ type: TOGGLE_PLAYING })
  })

  globalNavigator.mediaSession.setActionHandler("pause", () => {
    if (store) store.dispatch({ type: TOGGLE_PLAYING })
  })
}
if (mediaSessionEnabled) addActionListeners()

export default {
  setStore(s) {
    store = s
  },
  playSong(song) {
    if (mediaSessionEnabled) {
      addNewSong(song)
    }
  },
}
