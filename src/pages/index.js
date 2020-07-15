import React from "react"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';

import Layout from "../components/layout";
import BottomPlayer from '../components/bottomPlayer/BottomPlayer';

const IndexPage = () => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: deepPurple,
    },
  });
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Layout>

        <BottomPlayer />
      </Layout>
    </MuiThemeProvider>
  );
}

export default IndexPage
