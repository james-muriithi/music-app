import React, {useEffect, useRef} from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types"

function AudioPlayer(props) {
    const {playState, songs} = props;

    const audio_player = useRef(null)

    useEffect(() => {
        if (playState.playing && songs[playState.songId]) {
            audio_player.current.src = URL.createObjectURL(songs[ playState.songId ])
            audio_player.current.play();
        }
    }, [playState])

    return (
        <audio
            hidden
            controls
            // onEnded={this.songEnded}
            // onTimeUpdate={this.updateTime}
            ref={audio_player}
        >
            <track kind="captions" {...{}} />
        </audio>
    )
}

const mapStateToProps = state => ({
    songs: state.songs,
    playState: state.playState
})

AudioPlayer.propTypes = {
    songs: PropTypes.array.isRequired,
    playState: PropTypes.object.isRequired
}

export default connect(mapStateToProps,null)(AudioPlayer);
