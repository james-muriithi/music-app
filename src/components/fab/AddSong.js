import React from "react"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: "110px",
    right: "25px",
    zIndex: 3000,
  },
}))

export default function AddSong() {
  const classes = useStyles()
  return (
    <Fab
      color="secondary"
      aria-label="Add"
      component="label"
      htmlFor="song-input"
      className={classes.root}
    >
      <input
        style={{ display: "none" }}
        id="song-input"
        type="file"
        multiple
        accept="audio/mp3,audio/m4a"
      />
      <AddIcon />
    </Fab>
  )
}
