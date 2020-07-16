import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core'

// import MusicNote from '@material-ui/icons/MusicNote';
// import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme =>({
    root: {
        height: '85%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        '& .box': {
            WebkitTransform: 'scaleY(0.4)',
            transform: 'scaleY(0.4)',
            height: '100%',
            width: 'var(--boxSize)',
            background: theme.palette.secondary.main,
            WebkitAnimationDuration: '1.2s',
            animationDuration: '1.2s',
            WebkitAnimationTimingFunction: 'ease-in-out',
            animationTimingFunction: 'ease-in-out',
            WebkitAnimationIterationCount: 'infinite',
            animationIterationCount: 'infinite',
            borderRadius: 8,
        },
        '& .pause': {
            '& .box':{
                WebkitAnimationPlayState: 'paused',
                animationPlayState: 'paused',
            }
        },
        '& .play': {
            '& .box':{
                WebkitAnimationPlayState: 'running',
                animationPlayState: 'running',
            }
        }
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
    const [paused, setPaused] = useState(false)
    setTimeout(() => {
        setPaused(true)
    }, 1000);
    return (
        <div className={classes.root}>
            {/* <Avatar className={classes.avatar}>
                <MusicNote className={classes.musicNote} />
            </Avatar> */}
            <div class={`boxContainer ${paused? 'pause': 'play'}`}>
                <div class="box box1"></div>
                <div class="box box2"></div>
                <div class="box box3"></div>
                <div class="box box4"></div>
                <div class="box box5"></div>
            </div>
        </div>
    )
}
