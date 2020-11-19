import { TOGGLE_PLAYING, PLAY_SONG } from "../actions/types"

let store
const globalNavigator = typeof navigator !== "undefined" && navigator
const mediaSessionEnabled = globalNavigator
  ? "mediaSession" in globalNavigator
  : false

// add new song
const addNewSong = id => {
  const state = store.getState()
  const title = state.songs[id].name
  let artist = "Unknown"
  if (title.indexOf(" - ") !== -1) {
    artist = title.split(" - ")[0]
  }
  // add song metadata
  globalNavigator.mediaSession.metadata = new window.MediaMetadata({
    title,
    artist,
    album: "Unknown Albumn",
    artwork: [
      {
        src: require("../images/icons/icon-96x96.png"),
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: require("../images/icons/icon-144x144.png"),
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: require("../images/icons/icon-192x192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: require("../images/icons/icon-256x256.png"),
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: require("../images/icons/icon-512x512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  })
}
// play previous
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
  // play next
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

  // play song
  globalNavigator.mediaSession.setActionHandler("play", () => {
    if (store) store.dispatch({ type: TOGGLE_PLAYING })
  })

  // pause song
  globalNavigator.mediaSession.setActionHandler("pause", () => {
    if (store) store.dispatch({ type: TOGGLE_PLAYING })
  })
  // forward song
  globalNavigator.mediaSession.setActionHandler("seekforward", () => {
    console.log("not yet supported")
  })

  // rewind song
  globalNavigator.mediaSession.setActionHandler("seekbackward", () => {
    console.log("not yet supported")
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
