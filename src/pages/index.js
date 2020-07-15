import React from "react"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';

import Layout from "../components/layout"

const IndexPage = () => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: deepPurple,
    },
  });
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Layout>
        <h1>Hi people</h1>
      </Layout>
    </MuiThemeProvider>
  );
}

export default IndexPage
