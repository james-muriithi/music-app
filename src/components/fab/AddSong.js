import React from "react"
import PropTypes from "prop-types"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import { makeStyles } from "@material-ui/core"
import { connect } from "react-redux"

import { addSongs } from "../../actions/SongActions"

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: "110px",
    right: "25px",
    zIndex: 3000,
  },
}))

function AddSong(props) {
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
        onChange={e => {
          props.addSongs(e.currentTarget.files)
        }}
        multiple
        accept="audio/mp3"
      />
      <AddIcon />
    </Fab>
  )
}

AddSong.propTypes = {
  addSongs: PropTypes.func.isRequired,
}

export default connect(null, { addSongs })(AddSong)
