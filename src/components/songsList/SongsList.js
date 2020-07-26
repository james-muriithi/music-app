import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import _ from "lodash"

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
  const [songs, setSongs] = useState(props.songs)
  const { searchTerm } = props
  const classes = useStyles()

  useEffect(() => {
    if (searchTerm) {
      let filteredSongs = _.filter(props.songs, song =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSongs(filteredSongs)
    } else {
      setSongs(props.songs)
    }
  }, [searchTerm, props.songs])

  if (!songs.length) {
    return (
      <div className={classes.root}>
        <h4 style={{ fontWeight: 300, textAlign: "center" }}>
          {searchTerm
            ? "No song matches your search"
            : "No Songs Present. Please Add Some Songs"}
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
  searchTerm: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, null)(SongsList)
