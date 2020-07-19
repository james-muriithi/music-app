import React from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import { connect } from "react-redux"

import Song from "../song/Song"

function SongsList(props) {
  const { songs } = props

  if (!songs.length) {
    return (
      <h4 style={{ fontWeight: 300, textAlign: "center" }}>
        No Songs Present. Please Add Some Songs
      </h4>
    )
  }

  return (
    <List>
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
