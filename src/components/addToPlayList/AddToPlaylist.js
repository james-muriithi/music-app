import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
];

function ConfirmationDialogRaw(props) {
    const { onClose, open, handleClickListItem, ...other } = props;

    const handleEntering = () => {
        
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose();
    };


    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">
                <PlaylistAddIcon style={{marginBottom: '-5px', marginRight: '5px'}} />
                Add to playlist
            </DialogTitle>
            <DialogContent dividers style={{paddingLeft:0,paddingRight:0 }} >
                <List
                disablePadding={true}
                >
                    <ListItem button style={{ paddingLeft: '24px' }} onClick={handleClickListItem} >
                        <ListItemText primary={'Khalid'} />
                    </ListItem>

                </List>                
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="secondary">
                    Cancel
        </Button>
                <Button onClick={handleOk} color="secondary">
                    New Playlist
        </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    handleClickListItem: PropTypes.func.isRequired
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));

function AddToPlaylistDialog(props) {
    const classes = useStyles();
    const [ open, setOpen ] = React.useState(false);

    const {open: globalOpen, handleClose } = props

    useEffect(() => {
        if (open != globalOpen) {
            setOpen(globalOpen)
        }
    }, [globalOpen])

    const handleClickListItem = () => {
        setOpen(false);
    };

    return (
        <ConfirmationDialogRaw
            classes={{
                paper: classes.paper,
            }}
            id="ringtone-menu"
            keepMounted
            open={open}
            onClose={handleClose}
            handleClickListItem={handleClickListItem}
        />
    );
}


AddToPlaylistDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClickListItem: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AddToPlaylistDialog;