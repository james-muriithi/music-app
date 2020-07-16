import React, { useState, useEffect, useRef } from "react"

import { makeStyles, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import PauseIcon from "@material-ui/icons/Pause"
import IconButton from "@material-ui/core/IconButton"
import SkipPrevious from "@material-ui/icons/SkipPrevious"
import PlayIcon from "@material-ui/icons/PlayCircleFilled"
import SkipNext from "@material-ui/icons/SkipNext"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import Repeat from "@material-ui/icons/Repeat"
import RepeatOne from "@material-ui/icons/RepeatOne"
import Slider from "@material-ui/core/Slider"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    zIndex: 500,
    position: "fixed",
    bottom: "0px",
    left: "0px",
    width: "100%",
    minHeight: "80px",
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
}))

function BottomPlayer() {
  const props = { width: "-200%" }
  const classes = useStyles(props)

  const [overflow, setOverflow] = useState(false)
  const songTitle = useRef(null)
  const globalWindow = typeof window !== "undefined" && window

  useEffect(() => {
    const isElementOverflowing = () => {
      const element = songTitle.current
      console.log(element.scrollWidth)
      if (element.offsetWidth < element.scrollWidth) {
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
          {
            "song.namesong.namesong.namesong.namesong.namesong.namesong.namesong.namesong.name"
          }
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
        <Slider
          style={{ height: "2px" }}
          className={classes.slider}
          value={12}
          max={100}
          min={0}
          defaultValue={2}
        />
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
            <IconButton>
              {/* {playState.playing ? <PauseIcon /> : <PlayIcon />} */}
              <PlayIcon color="primary" className={classes.icon} />
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

export default BottomPlayer
