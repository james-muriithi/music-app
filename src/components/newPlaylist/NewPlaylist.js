import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { connect } from "react-redux"

import Snackbar from "../alert/ShowSnackbar"
import { newPlaylist } from "../../actions/PlaylistActions"

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

function NewPlaylist(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [errorText, setErrorText] = React.useState("")
  const [toastMessage, setToastMessage] = useState("")
  const [toastSeverity, setToastSeverity] = useState("success")
  const [alertOpen, setAlertOpen] = useState(false)

  const playlistName = useRef(null)

  const { open: globalOpen, handleClose, newPlaylist } = props

  useEffect(() => {
    if (open !== globalOpen) {
      setOpen(globalOpen)
    }
  }, [globalOpen])

  const addNewPlaylist = () => {
    let name = playlistName.current.value.trim()
    if (name) {
      newPlaylist(name)
      playlistName.current.value = ""
      handleClose()
      setToastMessage("Playlist added successfully")
      setAlertOpen(true)
    } else {
      setErrorText("Please provide a playlist name")
    }
  }

  return (
    <>
      <Dialog
        maxWidth="xs"
        classes={{
          paper: classes.paper,
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            helperText={errorText}
            error={errorText.length === 0 ? false : true}
            inputProps={{ ref: playlistName }}
            autoComplete="off"
            onChange={e => {
              setErrorText("")
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addNewPlaylist} color="secondary">
            Create playlist
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alertOpen}
        message={toastMessage}
        severity={toastSeverity}
      />
    </>
  )
}

NewPlaylist.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  newPlaylist: PropTypes.func.isRequired,
}

export default connect(null, { newPlaylist })(NewPlaylist)
