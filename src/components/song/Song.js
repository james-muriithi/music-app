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
import PlayIcon from "@material-ui/icons/PlayArrowSharp"
import PlusIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import { connect } from "react-redux"

import { removeSong } from "../../actions/SongActions";
import { playSong } from "../../actions/SongStateActions";

function Song(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleIconClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const { song, removeSong: remove, song_id, playSong } = props

  return (
    <>
      <ListItem className="song" button={true} divider={true} onClick={()=>{
        playSong(song_id);
      }} >
        <ListItemAvatar>
          <Avatar>
            <MusicNote />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={song.name} secondary={`unknown artist 03:26`} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={handleIconClick}>
            <MoreVert />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>
          <PlayIcon color="primary" /> Play next
        </MenuItem>
        <MenuItem>
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
}

export default connect(null, { removeSong, playSong })(Song)
