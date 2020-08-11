import React from 'react';
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
    const { onClose, value: valueProp, open, ...other } = props;
    const [ value, setValue ] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [ valueProp, open ]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(value);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
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
            style={{
                zIndex: '10000!important'
            }}
        >
            <DialogTitle id="confirmation-dialog-title">
                <PlaylistAddIcon style={{marginBottom: '-5px', marginRight: '5px'}} />
                Add to playlist
            </DialogTitle>
            <DialogContent dividers>
                <List
                disablePadding={true}
                >
                    <ListItem button>
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
    value: PropTypes.string.isRequired,
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

export default function ConfirmationDialog() {
    const classes = useStyles();
    const [ open, setOpen ] = React.useState(true);
    const [ value, setValue ] = React.useState('Dione');

    const handleClickListItem = () => {
        setOpen(false);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
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
            value={value}
        />
    );
}
