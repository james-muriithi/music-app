import React from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"

import Song from "../song/Song"

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(11),
    paddingTop: theme.spacing(9),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(7),
    },
  },
}))

function SongsList(props) {
  const { songs } = props
  const classes = useStyles()

  if (!songs.length) {
    return (
      <div className={classes.root}>
        <h4 style={{ fontWeight: 300, textAlign: "center" }}>
          No Songs Present. Please Add Some Songs
        </h4>
      </div>
    )
  }

  return (
    <List className={classes.root}>
      {songs.length &&
        songs.map((song, index) => (
          <Song song={song} song_id={index} key={index} />
        ))}
    </List>
  )
}

const mapStateToProps = state => ({
  songs: state.songs,
})

SongsList.propTypes = {
  songs: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, null)(SongsList)
