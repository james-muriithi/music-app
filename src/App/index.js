import React, { useState } from "react"

import Layout from "../components/layout"
import BottomPlayer from "../components/bottomPlayer/BottomPlayer"
import SongsList from "../components/songsList/SongsList"
import AddSong from "../components/fab/AddSong"
import AudioPlayer from "../components/audio/AudioPlayer"

function App() {
  const [currentTime, setCurrentTime] = useState(0)
  return (
    <Layout>
      <AudioPlayer setCurrentTime={setCurrentTime} />
      <SongsList />
      <BottomPlayer currentTime={currentTime} />
      <AddSong />
    </Layout>
  )
}

export default App
