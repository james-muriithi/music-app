import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


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
    const [ open, setOpen ] = React.useState(false)

    const { open: globalOpen, handleClose } = props

    useEffect(() => {
        if (open !== globalOpen) {
            setOpen(globalOpen)
        }
    }, [ globalOpen ])

    return (
        <Dialog
            maxWidth="xs"
            classes={{
                paper: classes.paper,
            }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Playlist</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
              </Button>
                <Button onClick={handleClose} color="secondary">
                    Create playlist
              </Button>
            </DialogActions>
        </Dialog>

    );
}

NewPlaylist.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default NewPlaylist

