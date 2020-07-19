import React from "react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import deepPurple from "@material-ui/core/colors/deepPurple"
import deepOrange from "@material-ui/core/colors/deepOrange"
import { Provider } from "react-redux"

import App from "../App"
import store from "../store"
import mediaNotification from "../utils/media-session"

const IndexPage = props => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: deepPurple,
      secondary: deepOrange,
    },
  })

  mediaNotification.setStore(store)

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  )
}

export default IndexPage
