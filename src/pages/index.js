import React from "react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import deepPurple from "@material-ui/core/colors/deepPurple"
import deepOrange from "@material-ui/core/colors/deepOrange"
import { Provider } from "react-redux"

import Layout from "../components/layout"
import BottomPlayer from "../components/bottomPlayer/BottomPlayer"
import SongsList from "../components/songsList/SongsList"
import AddSong from "../components/fab/AddSong"
import store from "../store"

const IndexPage = props => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: deepPurple,
      secondary: deepOrange,
    },
  })

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <Layout>
          <SongsList />
          <BottomPlayer />
          <AddSong />
        </Layout>
      </MuiThemeProvider>
    </Provider>
  )
}

export default IndexPage
