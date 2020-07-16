import React from "react"
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

export default function Song() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleIconClick = event => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <ListItem className="song">
        <ListItemAvatar>
          <Avatar>
            <MusicNote />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`song.name`} secondary={"unknown artist"} />
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
                  <PlayIcon color='primary' /> Play next
        </MenuItem>
        <MenuItem>
          <PlusIcon color='primary' /> Add to playlist
        </MenuItem>
        <MenuItem>
                  <DeleteIcon color='secondary' /> Delete
        </MenuItem>
      </Menu>
    </>
  )
}
