import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Dialog from "@material-ui/core/Dialog"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd"
import Typography from "@material-ui/core/Typography"
import { connect } from "react-redux"

import { addSongToPlaylist } from "../../actions/PlaylistActions"

function ConfirmationDialogRaw(props) {
  const {
    onClose,
    open,
    playlistSong,
    handleNewPlaylist,
    addSongToPlaylist,
    playlists,
    ...other
  } = props

  const handleClickListItem = (playlist, song) => {
    if (playlist && song) {
      addSongToPlaylist(playlist, song)
    }
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      scroll="paper"
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        <PlaylistAddIcon style={{ marginBottom: "-5px", marginRight: "5px" }} />
        Add to playlist
      </DialogTitle>
      <DialogContent dividers style={{ paddingLeft: 0, paddingRight: 0 }}>
        <List disablePadding={true}>
          {playlists &&
            Object.keys(playlists).map((playlist, index) => (
              <ListItem
                button
                style={{ paddingLeft: "24px" }}
                key={index}
                onClick={() => {
                  handleClickListItem(playlist, playlistSong)
                }}
              >
                <ListItemText primary={playlist} />
              </ListItem>
            ))}
          {Object.keys(playlists).length === 0 && (
            <Typography
              style={{ paddingLeft: "24px" }}
              component="p"
              color="primary"
            >
              You have no playlists
            </Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleNewPlaylist} color="secondary">
          New Playlist
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  addSongToPlaylist: PropTypes.func.isRequired,
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: "80%",
    maxHeight: 435,
  },
}))

function AddToPlaylistDialog(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const {
    open: globalOpen,
    handleClose,
    playlistSong,
    addSongToPlaylist,
    handleNewPlaylist,
    playlists,
  } = props

  useEffect(() => {
    if (open != globalOpen) {
      setOpen(globalOpen)
    }
  }, [globalOpen])

  return (
    <ConfirmationDialogRaw
      classes={{
        paper: classes.paper,
      }}
      id="ringtone-menu"
      keepMounted
      open={open}
      playlists={playlists}
      onClose={handleClose}
      handleNewPlaylist={handleNewPlaylist}
      playlistSong={playlistSong}
      addSongToPlaylist={addSongToPlaylist}
    />
  )
}

const mapStateToProps = state => ({
  playlists: state.playlists,
})

AddToPlaylistDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleNewPlaylist: PropTypes.func.isRequired,
  playlists: PropTypes.array.isRequired,
  playlistSong: PropTypes.any,
  addSongToPlaylist: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { addSongToPlaylist })(
  AddToPlaylistDialog
)
