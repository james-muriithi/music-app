import { playSong } from "../actions/SongActions"
import { togglePlaying } from "../actions/SongActions"

let store
const mediaSessionEnabled = "mediaSession" in navigator
const addNewSong = id => {
  const state = store.getState()
  navigator.mediaSession.metadata = new window.MediaMetadata({
    title: state.songs[id].name,
    artist: "Unknown",
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
  navigator.mediaSession.setActionHandler("previoustrack", () => {
    if (store) {
      const state = store.getState()
      const prevId =
        state.playState.songId === 0
          ? state.songs.length - 1
          : state.playState.songId - 1
      playSong(prevId)
    }
  })

  navigator.mediaSession.setActionHandler("nexttrack", () => {
    if (store) {
      const state = store.getState()
      const nextId = (state.playState.songId + 1) % state.songs.length
      playSong(nextId)
    }
  })

  navigator.mediaSession.setActionHandler("play", () => {
    if (store) togglePlaying()
  })

  navigator.mediaSession.setActionHandler("pause", () => {
    if (store) togglePlaying()
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
