import React from "react"
import { makeStyles } from "@material-ui/core"
import PropTypes from "prop-types"

// import MusicNote from '@material-ui/icons/MusicNote';
// import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    height: "85%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .box": {
      WebkitTransform: "scaleY(0.4)",
      transform: "scaleY(0.4)",
      height: "100%",
      width: "var(--boxSize)",
      background: theme.palette.secondary.main,
      WebkitAnimationDuration: "1.3s",
      animationDuration: "1.3s",
      WebkitAnimationTimingFunction: "ease-in-out",
      animationTimingFunction: "ease-in-out",
      WebkitAnimationIterationCount: "infinite",
      animationIterationCount: "infinite",
      borderRadius: 8,
    },
    "& .pause": {
      "& .box": {
        WebkitAnimationPlayState: "paused",
        animationPlayState: "paused",
      },
    },
    "& .play": {
      "& .box": {
        WebkitAnimationPlayState: "running",
        animationPlayState: "running",
      },
    },
  },
  musicNote: {
    fontSize: "45px",
  },
  avatar: {
    height: "80px",
    width: "80px",
  },
}))
function SongMetaData(props) {
  const classes = useStyles()
  const { playState } = props

  return (
    <div className={classes.root}>
      {/* <Avatar className={classes.avatar}>
                <MusicNote className={classes.musicNote} />
            </Avatar> */}
      <div className={`boxContainer ${playState.playing ? "play" : "pause"}`}>
        <div className="box box1"></div>
        <div className="box box2"></div>
        <div className="box box3"></div>
        <div className="box box4"></div>
        <div className="box box5"></div>
      </div>
    </div>
  )
}

SongMetaData.propTypes = {
  playState: PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    songId: PropTypes.number,
  }).isRequired,
}

export default SongMetaData
