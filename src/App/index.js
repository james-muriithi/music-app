import React from 'react'

import Layout from "../components/layout"
import BottomPlayer from "../components/bottomPlayer/BottomPlayer"
import SongsList from "../components/songsList/SongsList"
import AddSong from "../components/fab/AddSong"
import AudioPlayer from '../components/audio/AudioPlayer'

function App() {
    return (
        <Layout>
            <AudioPlayer />
            <SongsList />
            <BottomPlayer />
            <AddSong />
        </Layout>
    )
}


export default App;