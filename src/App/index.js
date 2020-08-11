import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Layout from "../components/layout"
import BottomPlayer from "../components/bottomPlayer/BottomPlayer"
import SongsList from "../components/songsList/SongsList"
import AddSong from "../components/fab/AddSong"
import AudioPlayer from "../components/audio/AudioPlayer"
import keyboardEvents from "../utils/keyboardEvents"
import { togglePlaying, playSong } from "../actions/SongStateActions"
import Header from "../components/header/Header"
import _ from "lodash"

function App(props) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [dragTime, setDragTime] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const { togglePlaying, playState, songs, playSong, shuffle } = props

  const { songId } = playState

  const toggle = () => {
    togglePlaying()
  }

  const playNext = () => {
    URL.revokeObjectURL(songs[songId])
    let nextSongId = (songId + 1) % songs.length
    if (shuffle) {
      nextSongId = shuffleSongs(songId)
    }
    playSong(nextSongId)
  }

  const playPrevious = () => {
    URL.revokeObjectURL(songs[songId])
    let prevSongId = songId === 0 ? songs.length - 1 : songId - 1
    if (shuffle) {
      prevSongId = shuffleSongs(songId)
    }
    playSong(prevSongId)
  }

  const shuffleSongs = (exceptSongId = null) => {
    const mySongs = []
    songs.map((_, index) => {
      if (index !== exceptSongId) {
        mySongs.push(index)
      }
    })
    return _.sample(mySongs)
  }

  const timeDrag = time => {
    setDragTime(duration * (time / 100))
  }

  useEffect(() => {
    if (playState.playing && playState.songId === -1) {
      if (songs[0]) {
        playSong(0)
      }
    }
  }, [playState])

  useEffect(() => {
    keyboardEvents({
      togglePlaying: toggle,
    })
  }, [])

  return (
    <Layout>
      <Header setSearchTerm={setSearchTerm} />
      <AudioPlayer
        setCurrentTime={setCurrentTime}
        setDuration={setDuration}
        dragTime={dragTime}
        playNext={playNext}
      />
      <SongsList searchTerm={searchTerm} />
      <BottomPlayer
        currentTime={currentTime}
        duration={duration}
        playNext={playNext}
        playPrevious={playPrevious}
        timeDrag={timeDrag}
      />
      <AddSong />
    </Layout>
  )
}

const mapStateToProps = state => ({
  playState: state.playState,
  songs: state.songs,
  shuffle: state.settings.shuffle,
})

export default connect(mapStateToProps, { togglePlaying, playSong })(App)
