import React, {useEffect, useRef} from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types"
import { togglePlaying } from "../../actions/SongStateActions";

function AudioPlayer(props) {
    const {playState, songs, togglePlaying, setCurrentTime} = props;

    const audio_player = useRef(null)

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevState = usePrevious({ playState });

    useEffect(() => {
        if (playState.playing && songs[playState.songId] ) {
            if (prevState.playState.songId === -1 || prevState.playState.songId !== playState.songId) {
                audio_player.current.src = URL.createObjectURL(songs[ playState.songId ])
                audio_player.current.play();
            }else{
                audio_player.current.play();
            }
        }  else if (!playState.playing && songs[ playState.songId ]) {
            audio_player.current.pause();
        }
    }, [playState])

    const onSongEnded = () =>{
        // for now 
        togglePlaying(playState.songId)
    }

    const updateTime = () =>{
        const currentTime = 100 * audio_player.current.currentTime / audio_player.current.duration || 0;
        setCurrentTime(currentTime);
    }

    return (
        <audio
            hidden
            controls
            onEnded={onSongEnded}
            onTimeUpdate={updateTime}
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
    playState: PropTypes.PropTypes.shape({
        playing: PropTypes.bool.isRequired,
        songId: PropTypes.number.isRequired,
    }).isRequired,
    togglePlaying: PropTypes.func.isRequired,
    setCurrentTime: PropTypes.func.isRequired
}

export default connect(mapStateToProps,{togglePlaying})(AudioPlayer);
