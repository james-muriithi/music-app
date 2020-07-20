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

import { togglePlaying } from "../../actions/SongStateActions"

const useStyles = makeStyles({
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
})

function BottomPlayer(props) {
  const { currentTime, togglePlaying, songs, playState, duration } = props

  const classes = useStyles({ width: "-200%" })

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
        <Typography
          variant="caption"
          component="p"
          style={{ color: "#b2b2b2", textAlign: "center", paddingTop: "4px" }}
        >
          Unknown artist
        </Typography>
      </div>

      <Paper>
        {/* slider */}
        <Grid container spacing={2}>
          <Grid item style={{ paddingLeft: "10px" }}>
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
            />
          </Grid>
          <Grid item style={{ paddingRight: "10px" }}>
            {showDuration()}
          </Grid>
        </Grid>

        <div style={{ display: "flex" }}>
          <div
            style={{ width: "35%", textAlign: "center" }}
            className="side-icons"
          >
            <IconButton>
              {/* {repeat === 1
                                ? <RepeatOne /> : <Repeat style={repeat === 2 ? {} : { opacity: 0.5 }} />
                            } */}
              <RepeatOne />
            </IconButton>
            <IconButton>
              <SkipPrevious />
            </IconButton>
          </div>
          <div
            style={{ width: "30%", textAlign: "center" }}
            className="play-pause-button"
          >
            <IconButton
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
            <IconButton>
              <SkipNext />
            </IconButton>
            <ShuffleIcon
              className="material-icons"
              style={{ color: "rgba(0, 0, 0, 0.3)" }}
            />
          </div>
        </div>
      </Paper>
    </div>
  )
}

const mapStateToProps = state => ({
  songs: state.songs,
  playState: state.playState,
})

BottomPlayer.propTypes = {
  currentTime: PropTypes.number.isRequired,
  songs: PropTypes.array.isRequired,
  playState: PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    songId: PropTypes.number.isRequired,
  }).isRequired,
  togglePlaying: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
}

export default connect(mapStateToProps, { togglePlaying })(BottomPlayer)
