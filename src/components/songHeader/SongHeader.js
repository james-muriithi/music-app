import React from "react"

import { makeStyles, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import MoreVert from "@material-ui/icons/MoreVert"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    zIndex: 500,
    position: "fixed",
    top: "0",
    left: "0px",
    width: "100%",
    height: "80px",
  },
  noPadding: {
    padding: "0px",
  },
  paperTop: {
    display: "flex",
    padding: "15px",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontWeight: 600,
    color: "#404040",
  },
  square: {
    width: "45px",
    height: "50px",
  },
}))

function BottomPlayer(props) {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <div className={classes.paperTop}>
          <IconButton
            aria-label="close song modal"
            onClick={props.toggleDrawer}
            className={classes.noPadding}
          >
            <KeyboardArrowDownIcon style={{ fontSize: "30px" }} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Now Playing
          </Typography>
          <IconButton className={classes.noPadding} aria-label="more info">
            <MoreVert style={{ fontSize: "25px" }} />
          </IconButton>
        </div>
      </Paper>
    </>
  )
}

export default BottomPlayer
