import React from 'react';

import { makeStyles, Typography } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import PauseIcon from '@material-ui/icons/Pause';
import MusicNote from '@material-ui/icons/MusicNote';
import PlayIcon from '@material-ui/icons/PlayArrowSharp';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        zIndex: 500,
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        width: '100%',
        height: '80px'
    },
    icon: {
        fontSize: '40px',
        padding: '0px',
    },
    square: {
        width: '45px',
        height: '50px'
    }
}))

function BottomPlayer() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <LinearProgress variant="determinate" value={12} />
            <div className="now-playing-container">
                <Avatar variant="square" className={classes.square}>
                    <MusicNote style={{fontSize: '35px'}} />
                </Avatar>
                <div className="song-name">
                    <Typography variant="body1">
                        hello there
                    </Typography>
                    <Typography variant="caption" style={{ color: '#b2b2b2'}}>
                        Unknown artist
                    </Typography>
                </div>
                <IconButton className={classes.icon}>
                    <PlayIcon className={classes.icon} />
                </IconButton>
            </div>
        </Paper>
    )
}

export default BottomPlayer;