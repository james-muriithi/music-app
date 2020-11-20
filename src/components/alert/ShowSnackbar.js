import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function ShowSnackbar(props) {
  const { message, severity = "success", open: globalOpen } = props

  const [open, setOpen] = useState(globalOpen)

  function handleClose() {
    setOpen(false)
  }

  useEffect(() => {
    if (open != globalOpen) {
      setOpen(globalOpen)
    }
  }, [globalOpen])

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

ShowSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string,
}

export default ShowSnackbar
