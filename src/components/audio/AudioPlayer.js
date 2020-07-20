import React, { useEffect, useRef } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { togglePlaying, playSong } from "../../actions/SongStateActions"

function AudioPlayer(props) {
  const {
    playState,
    songs,
    togglePlaying,
    setCurrentTime,
    setDuration,
    dragTime,
  } = props

  const audio_player = useRef(null)

  const usePrevious = value => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const prevState = usePrevious({ playState })

  useEffect(() => {
    if (playState.playing && songs[playState.songId]) {
      if (
        prevState.playState.songId === -1 ||
        prevState.playState.songId !== playState.songId
      ) {
        audio_player.current.src = URL.createObjectURL(songs[playState.songId])
        audio_player.current.play()
      } else {
        audio_player.current.play()
      }
    } else if (!playState.playing && songs[playState.songId]) {
      audio_player.current.pause()
    }
  }, [playState])

  useEffect(() => {
    if (dragTime) {
      audio_player.current.currentTime = dragTime
    }
  }, [dragTime])

  useEffect(() => {
    if (playState.songId !== -1 && !songs[playState.songId]) {
      audio_player.current.src = ""
    }
  }, [songs])

  const onSongEnded = () => {
    const { repeatType, playNext, playSong } = props
    // repeat
    if (repeatType === 0) {
      playNext()
    } else if (repeatType === 1) {
      // repeat one
      playSong(playState.songId)
      // no repeat
    } else togglePlaying()
  }

  const updateTime = () => {
    setCurrentTime(audio_player.current.currentTime)
  }

  return (
    <audio
      hidden
      controls
      onEnded={onSongEnded}
      onTimeUpdate={updateTime}
      ref={audio_player}
      onLoadedMetadata={() => {
        setDuration(audio_player.current.duration)
      }}
    >
      <track kind="captions" {...{}} />
    </audio>
  )
}

const mapStateToProps = state => ({
  songs: state.songs,
  playState: state.playState,
  repeatType: state.settings.repeat,
})

AudioPlayer.propTypes = {
  songs: PropTypes.array.isRequired,
  playState: PropTypes.PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    songId: PropTypes.number.isRequired,
  }).isRequired,
  togglePlaying: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  setDuration: PropTypes.func.isRequired,
  timeDrag: PropTypes.number,
  repeatType: PropTypes.oneOf([0, 1, 2]).isRequired,
}

export default connect(mapStateToProps, { togglePlaying, playSong })(
  AudioPlayer
)
