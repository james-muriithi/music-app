import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "2rem",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: ".5rem",
    boxSizing: "border-box",
    "& .playing__bar": {
      display: "inline-block",
      background: "#fff",
      width: "30%",
      height: "100%",
      animation: `$up-and-down 1.3s ease infinite alternate`,
    },
    "& .playing__bar1": {
      height: "60%",
    },

    "& .playing__bar2": {
      height: "30%",
      animationDelay: "-2.4s",
    },
    "& .playing__bar3": {
      height: "75%",
      animationDelay: "-3.7s",
    },
    "&.pause": {
      "& .playing__bar": {
        WebkitAnimationPlayState: "paused",
        animationPlayState: "paused",
      },
    },
    "&.play": {
      "& .playing__bar": {
        WebkitAnimationPlayState: "running",
        animationPlayState: "running",
      },
    },
  },
  "@keyframes up-and-down": {
    "10%": {
      height: "30%",
    },

    "30%": {
      height: "100%",
    },

    "60%": {
      height: "50%",
    },

    "80%": {
      height: "75%",
    },

    "100%": {
      height: "20%",
    },
  },
})

export default function PlayingAnimation(props) {
  const classes = useStyles()
  return (
    <div className={`${classes.root} ${props.playing ? "play" : "pause"}`}>
      <span className="playing__bar playing__bar1"></span>
      <span className="playing__bar playing__bar2"></span>
      <span className="playing__bar playing__bar3"></span>
    </div>
  )
}
