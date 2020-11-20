import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import _ from "lodash"
import AddToPlaylist from "../addToPlayList/AddToPlaylist"

import Song from "../song/Song"
import NewPlaylist from "../newPlaylist/NewPlaylist"

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
  const [open, setOpen] = useState(false)
  const [newPlaylistModalOpen, setNewPlaylistModalOpen] = useState(false)
  const [playlistSong, setPlaylistSong] = useState(null)
  const { searchTerm, addSongToPlaylist } = props
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

  const openDialog = (song = null) => {
    setOpen(true)
    if (song) {
      setPlaylistSong(song)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const addToPlayList = e => {
    // if (selectedPlaylist && playlistSong) {
    //   addSongToPlaylist(selectedPlaylist, playlistSong)
    // }
  }

  const openNewPlaylistModal = () => {
    handleClose()
    setNewPlaylistModalOpen(true)
  }

  const handleNewPlaylistModalClose = () => {
    openDialog()
    setNewPlaylistModalOpen(false)
  }

  return (
    <>
      <List className={classes.root}>
        {songs.length &&
          songs.map((song, index) => (
            <Song
              openAddToPlayListModal={() => {
                openDialog(song)
              }}
              song={song}
              song_id={index}
              key={index}
            />
          ))}
      </List>
      <AddToPlaylist
        playlistSong={playlistSong}
        open={open}
        handleClickListItem={addToPlayList}
        handleNewPlaylist={openNewPlaylistModal}
        handleClose={handleClose}
      />
      <NewPlaylist
        open={newPlaylistModalOpen}
        handleClose={handleNewPlaylistModalClose}
      />
    </>
  )
}

const mapStateToProps = state => ({
  songs: state.songs,
})

SongsList.propTypes = {
  songs: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, {})(SongsList)
