import React, { useState } from "react"
import PropTypes from "prop-types"
import IconButton from "@material-ui/core/IconButton"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Avatar from "@material-ui/core/Avatar"
import MoreVert from "@material-ui/icons/MoreVert"
import MusicNote from "@material-ui/icons/MusicNote"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import PlusIcon from "@material-ui/icons/PlaylistAdd"
import DeleteIcon from "@material-ui/icons/Delete"
import { connect } from "react-redux"

import { removeSong } from "../../actions/SongActions"
import { playSong } from "../../actions/SongStateActions"
import PlayingAnimation from "../playingAnimation"
import SEO from "../seo/Seo"
import SwipeableListItem from "../SwipeableList/SwipeableListItem"

function Song(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleIconClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const {
    song,
    removeSong: remove,
    song_id,
    playSong,
    playState,
    openAddToPlayListModal: openModal,
  } = props

  const showIcon = () => {
    if (playState && playState.songId === song_id) {
      return <PlayingAnimation playing={playState.playing} />
    }
    return <MusicNote />
  }

  return (
    <>
      {playState.songId === song_id && <SEO title={song.name} />}
      <SwipeableListItem
        threshold={0.3}
        background={
          <>
            <IconButton onClick={openModal}>
              <PlusIcon style={{ color: "#fff" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                remove(song_id)
                setAnchorEl(null)
              }}
            >
              <DeleteIcon style={{ color: "#fff" }} />
            </IconButton>
          </>
        }
      >
        <ListItem
          className="song"
          button={true}
          divider={true}
          onClick={() => {
            playSong(song_id)
          }}
          ContainerProps={{
            style: { width: "100%" },
          }}
        >
          <ListItemAvatar>
            <Avatar>{showIcon()}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={song.name} secondary={`unknown artist`} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={handleIconClick}>
              <MoreVert />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </SwipeableListItem>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            openModal()
            setAnchorEl(null)
          }}
        >
          <PlusIcon color="primary" /> Add to playlist
        </MenuItem>
        <MenuItem
          onClick={() => {
            remove(song_id)
            setAnchorEl(null)
          }}
        >
          <DeleteIcon color="secondary" /> Delete
        </MenuItem>
      </Menu>
    </>
  )
}

Song.protoTypes = {
  song: PropTypes.object.isRequired,
  removeSong: PropTypes.func.isRequired,
  song_id: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  playState: PropTypes.object.isRequired,
  openAddToPlayListModal: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  playState: state.playState,
})

export default connect(mapStateToProps, { removeSong, playSong })(Song)
