import React, {useEffect, useRef} from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types"
import { togglePlaying } from "../../actions/SongStateActions";

function AudioPlayer(props) {
    const {playState, songs, togglePlaying} = props;

    const audio_player = useRef(null)

    useEffect(() => {
        if (playState.playing && songs[playState.songId]) {
            audio_player.current.src = URL.createObjectURL(songs[ playState.songId ])
            audio_player.current.play();
        }
    }, [playState])

    const onSongEnded = () =>{
        // for now 
        togglePlaying(playState.songId)
    }

    return (
        <audio
            hidden
            controls
            onEnded={onSongEnded}
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
    playState: PropTypes.object.isRequired,
    togglePlaying: PropTypes.func.isRequired
}

export default connect(mapStateToProps,{togglePlaying})(AudioPlayer);
