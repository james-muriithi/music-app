import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Layout from "../components/layout"
import BottomPlayer from "../components/bottomPlayer/BottomPlayer"
import SongsList from "../components/songsList/SongsList"
import AddSong from "../components/fab/AddSong"
import AudioPlayer from "../components/audio/AudioPlayer"
import keyboardEvents from "../utils/keyboardEvents"
import { togglePlaying, playSong } from "../actions/SongStateActions"

function App(props) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const { togglePlaying, playState, songs, playSong } = props

  const { songId } = playState

  const toggle = () => {
    togglePlaying();
  }

  const playNext = () => {
    URL.revokeObjectURL(songs[songId])
    const nextSongId = (songId + 1) % songs.length
    playSong(nextSongId)
  }

  const playPrevious = () => {
    URL.revokeObjectURL(songs[songId])
    const prevSongId =
      songId === 0 ? songs.length - 1 : songId - 1
    playSong(prevSongId)
  }

  useEffect(() => {
    if (playState.playing && playState.songId === -1) {
      if (songs[0]) {
        playSong(0);
      }
    }
  }, [playState])

  useEffect(() => {
    keyboardEvents({
      togglePlaying: toggle,
    });
  },[])

  return (
    <Layout>
      <AudioPlayer setCurrentTime={setCurrentTime} setDuration={setDuration} />
      <SongsList />
      <BottomPlayer
        currentTime={currentTime}
        duration={duration}
        playNext={playNext}
        playPrevious={playPrevious}
      />
      <AddSong />
    </Layout>
  )
}

const mapStateToProps = state => ({
  playState: state.playState,
  songs: state.songs,
})

export default connect(mapStateToProps, { togglePlaying, playSong })(App)
