import React from "react"
import PropTypes from 'prop-types';
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import {connect} from 'react-redux';

import Song from "../song/Song"

function SongsList(props) {
  const {songs} = props;
  
  if (!songs.length) {
    return (
      <h4 style={{ fontWeight: 300, textAlign: 'center' }}>No Songs Present. Please Add Some Songs</h4>
    );
  }
  console.log(songs);
  return (
    <List>
      {songs.length && songs.map((song, index) => (
        <div key={index}>
          <Song song={song} song_id={index} />
          <Divider />
        </div>
      ))}
    </List>
  )
}

const mapStateToProps = state => ({
  songs: state.songs
});

SongsList.propTypes = {
  songs: PropTypes.array.isRequired
}

export default connect(mapStateToProps,null)(SongsList);