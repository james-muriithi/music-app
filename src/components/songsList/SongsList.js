import React from "react"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"

import Song from "../song/Song"

export default function SongsList() {
  return (
    <List>
      <Song />
      <Divider />
    </List>
  )
}
