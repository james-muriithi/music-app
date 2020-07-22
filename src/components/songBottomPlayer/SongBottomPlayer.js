import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { makeStyles, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import PauseIcon from "@material-ui/icons/Pause"
import IconButton from "@material-ui/core/IconButton"
import SkipPrevious from "@material-ui/icons/SkipPrevious"
import PlayIcon from "@material-ui/icons/PlayArrowSharp"
import SkipNext from "@material-ui/icons/SkipNext"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import Repeat from "@material-ui/icons/Repeat"
import RepeatOne from "@material-ui/icons/RepeatOne"
import Slider from "@material-ui/core/Slider"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"

import { togglePlaying, changeRepeat } from "../../actions/SongStateActions"
import {
  shuffle as toggleShuffle,
  toggleFavorite,
} from "../../actions/SongActions"
import HeartIcon from "@material-ui/icons/FavoriteSharp"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    zIndex: 500,
    position: "fixed",
    bottom: "0px",
    left: "0px",
    width: "100%",
    minHeight: "80px",
    marginTop: "15px",
  },
  icon: {
    fontSize: "40px",
    padding: "0px",
  },
  square: {
    width: "45px",
    height: "50px",
  },
  noPadding: {
    padding: "0px",
  },
  slider: {
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  likeIcon: {
    fontSize: "27px",
    "&.favorite": {
      fill: theme.palette.secondary.main,
    },
  },
}))

function BottomPlayer(props) {
  const {
    currentTime,
    togglePlaying,
    songs,
    playState,
    duration,
    playNext,
    playPrevious,
    timeDrag,
    shuffle,
    repeatType: repeat,
    toggleFavorite,
  } = props

  const classes = useStyles()

  const [overflow, setOverflow] = useState(false)
  const songTitle = useRef(null)
  const globalWindow = typeof window !== "undefined" && window

  const showCurrentTime = () => {
    const value = (currentTime * duration) / 100
    let minutes = "0" + Math.floor(value / 60)
    let seconds = "0" + Math.floor(value % 60)
    minutes = minutes === "NaN" ? "00" : minutes
    seconds = seconds === "NaN" ? "00" : seconds
    return `${minutes.substr(-2)}:${seconds.substr(-2)}`
  }

  const showDuration = () => {
    let minutes = "0" + Math.floor(duration / 60)
    let seconds = "0" + Math.floor(duration % 60)
    return `${minutes.substr(-2)}:${seconds.substr(-2)}`
  }

  const repeatOnClick = () => {
    const { changeRepeat } = props
    const nextRepeat = repeat === 2 ? 0 : repeat + 1
    changeRepeat(nextRepeat)
  }

  const isFavorite = () => {
    const { favorites } = props
    if (favorites.indexOf(playState.songId) !== -1) {
      return true
    }
    return false
  }

  useEffect(() => {
    const isElementOverflowing = () => {
      const element = songTitle.current
      if (element && element.offsetWidth < element.scrollWidth) {
        setOverflow(true)
        return
      }
      setOverflow(false)
    }
    isElementOverflowing()

    globalWindow.addEventListener("resize", isElementOverflowing)
  }, [songTitle, globalWindow])

  return (
    <div className={classes.root}>
      <div style={{ overflow: "hidden", width: "100%", paddingBottom: "10px" }}>
        <Typography
          variant="h6"
          ref={songTitle}
          component="h3"
          className={overflow ? "marquee" : ""}
          style={{ textAlign: "center", whiteSpace: "nowrap" }}
        >
          {playState.songId !== -1 ? songs[playState.songId].name : "No Song"}
        </Typography>
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="caption"
            component="p"
            style={{
              color: "#b2b2b2",
              textAlign: "center",
              padding: "4px",
              display: "inline-block",
            }}
          >
            Unknown artist
          </Typography>
          <IconButton
            style={{ float: "right" }}
            onClick={() => {
              toggleFavorite(playState.songId)
            }}
          >
            <HeartIcon
              className={`${classes.likeIcon} ${
                isFavorite() ? "favorite" : ""
              }`}
            />
          </IconButton>
        </div>
      </div>

      <Paper>
        {/* slider */}
        <Grid container spacing={2}>
          <Grid item style={{ paddingLeft: "12px" }}>
            {showCurrentTime()}
          </Grid>
          <Grid item xs>
            <Slider
              style={{ height: "2px" }}
              className={classes.slider}
              valueLabelFormat={value => {
                value = (value * duration) / 100
                let minutes = "0" + Math.floor(value / 60)
                let seconds = "0" + Math.floor(value % 60)
                return `${minutes.substr(-2)}:${seconds.substr(-2)}`
              }}
              value={currentTime}
              defaultValue={0}
              onChange={(_, newVal) => timeDrag(newVal)}
            />
          </Grid>
          <Grid item style={{ paddingRight: "12px" }}>
            {showDuration()}
          </Grid>
        </Grid>

        <div style={{ display: "flex" }}>
          <div
            style={{ width: "35%", textAlign: "center" }}
            className="side-icons"
          >
            <IconButton onClick={repeatOnClick} aria-label="change repeat">
              {repeat === 1 ? (
                <RepeatOne />
              ) : (
                <Repeat style={repeat === 0 ? {} : { opacity: 0.5 }} />
              )}
            </IconButton>
            <IconButton onClick={playPrevious} aria-label="play previous song">
              <SkipPrevious />
            </IconButton>
          </div>
          <div
            style={{ width: "30%", textAlign: "center" }}
            className="play-pause-button"
          >
            <IconButton
              aria-label="play or pause button"
              onClick={() => {
                togglePlaying()
              }}
            >
              {playState.playing ? (
                <PauseIcon color="primary" className={classes.icon} />
              ) : (
                <PlayIcon color="primary" className={classes.icon} />
              )}
            </IconButton>
          </div>
          <div
            style={{ width: "35%", textAlign: "center" }}
            className="side-icons"
          >
            <IconButton onClick={playNext} aria-label="play next song">
              <SkipNext />
            </IconButton>
            <IconButton onClick={props.toggleShuffle}>
              <ShuffleIcon
                className="material-icons"
                style={{ opacity: `${shuffle ? 1 : 0.5}` }}
              />
            </IconButton>
          </div>
        </div>
      </Paper>
    </div>
  )
}

const mapStateToProps = state => ({
  songs: state.songs,
  playState: state.playState,
  repeatType: state.settings.repeat,
  shuffle: state.settings.shuffle,
  favorites: state.favorites,
})

BottomPlayer.propTypes = {
  currentTime: PropTypes.number.isRequired,
  songs: PropTypes.array.isRequired,
  playState: PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    songId: PropTypes.number.isRequired,
  }).isRequired,
  togglePlaying: PropTypes.func.isRequired,
  toggleShuffle: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  playNext: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  timeDrag: PropTypes.func.isRequired,
  repeatType: PropTypes.number.isRequired,
  shuffle: PropTypes.bool.isRequired,
  favorites: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, {
  togglePlaying,
  changeRepeat,
  toggleShuffle,
  toggleFavorite,
})(BottomPlayer)
