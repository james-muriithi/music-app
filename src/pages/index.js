import React from "react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import deepPurple from "@material-ui/core/colors/deepPurple"
import deepOrange from "@material-ui/core/colors/deepOrange"

import Layout from "../components/layout"
import BottomPlayer from "../components/bottomPlayer/BottomPlayer"
import SongsList from "../components/songsList/SongsList"

const IndexPage = () => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: deepPurple,
      secondary: deepOrange
    },
  })
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Layout>
        <SongsList />
        <BottomPlayer />
      </Layout>
    </MuiThemeProvider>
  )
}

export default IndexPage
