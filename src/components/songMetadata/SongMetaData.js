import React from 'react'
import { makeStyles } from '@material-ui/core'

import MusicNote from '@material-ui/icons/MusicNote';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(({
    root: {
        height: '85%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
    },
    musicNote:{
        fontSize: '45px'
    },
    avatar: {
        height: '80px',
        width: '80px'
    }
}))
export default function SongMetaData() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <MusicNote className={classes.musicNote} />
            </Avatar>
        </div>
    )
}
