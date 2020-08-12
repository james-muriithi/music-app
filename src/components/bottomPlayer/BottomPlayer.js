import React, { useState } from "react"
import PropTypes from "prop-types"
import { makeStyles, Typography } from "@material-ui/core"
import LinearProgress from "@material-ui/core/LinearProgress"
import Paper from "@material-ui/core/Paper"
import PauseIcon from "@material-ui/icons/Pause"
import MusicNote from "@material-ui/icons/MusicNote"
import PlayIcon from "@material-ui/icons/PlayArrowSharp"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import { connect } from "react-redux"

import SongHeader from "../songHeader/SongHeader"
import SongBottomPlayer from "../songBottomPlayer/SongBottomPlayer"
import SongMetaData from "../songMetadata/SongMetaData"
import { togglePlaying, playSong } from "../../actions/SongStateActions"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    zIndex: 500,
    position: "fixed",
    bottom: "0px",
    left: "0px",
    width: "100%",
    minHeight: "65px",
    "& .now-playing-container": {
      display: "flex",
      padding: "10px",
      paddingBottom: "5px",
      "& .song-name": {
        padding: "0px 5px",
        paddingLeft: "10px",
        color: "#333333",
        lineHeight: "1.7rem",
        width: "100%",
        overflow: "hidden",
      },
    },
  },
  icon: {
    fontSize: "40px",
    padding: "0px",
  },
  square: {
    width: "45px",
    height: "50px",
  },
}))

function BottomPlayer(props) {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const {
    playState,
    songs,
    togglePlaying,
    currentTime,
    duration,
    playSong,
    playNext,
    playPrevious,
    timeDrag,
  } = props

  const toggleDrawer = event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    if (playState.songId === -1) {
      return
    }

    setOpen(prevState => !prevState)
  }

  const progressValue = duration !== 0 ? (currentTime * 100) / duration : 0

  return (
    <>
      <Paper className={classes.root}>
        <LinearProgress variant="determinate" value={progressValue} />
        <div className="now-playing-container">
          <Avatar variant="square" className={classes.square}>
            <MusicNote style={{ fontSize: "35px" }} />
          </Avatar>
          <div
            className="song-name"
            onClick={() => {
              if (playState.songId !== -1) {
                setOpen(true)
              }
            }}
            onKeyUp={evt => {
              if (evt.keyCode === 38) {
                if (playState.songId !== -1) {
                  setOpen(true)
                }
              }
            }}
          >
            <Typography variant="body1" noWrap>
              {playState.songId !== -1 && songs[playState.songId]
                ? songs[playState.songId].name
                : "No Song"}
            </Typography>
            <Typography variant="caption" style={{ color: "#8c8c8c" }}>
              Unknown artist
            </Typography>
          </div>
          <IconButton
            className={classes.icon}
            onClick={() => {
              if (playState.songId !== -1) {
                togglePlaying()
              } else {
                songs[0] && playSong(0)
              }
            }}
            style={{
              marginLeft: "auto",
            }}
            aria-label="play or pause button"
          >
            {playState.playing ? (
              <PauseIcon className={classes.icon} />
            ) : (
              <PlayIcon className={classes.icon} />
            )}
          </IconButton>
        </div>
      </Paper>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        ModalProps={{
          style: { zIndex: 10000 },
        }}
        PaperProps={{
          style: { height: "100%" },
        }}
      >
        <>
          <SongHeader toggleDrawer={toggleDrawer} />
          <SongMetaData playState={playState} />
          <SongBottomPlayer
            currentTime={progressValue}
            duration={duration}
            playNext={playNext}
            playPrevious={playPrevious}
            timeDrag={timeDrag}
          />
        </>
      </SwipeableDrawer>
    </>
  )
}

const mapStateToProps = state => ({
  songs: state.songs,
  playState: state.playState,
})

BottomPlayer.propTypes = {
  songs: PropTypes.array.isRequired,
  playState: PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    songId: PropTypes.number.isRequired,
  }).isRequired,
  togglePlaying: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  timeDrag: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { togglePlaying, playSong })(
  BottomPlayer
)
