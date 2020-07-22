import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Divider from "@material-ui/core/Divider"

import HeartIcon from "@material-ui/icons/FavoriteSharp"
import PlayListIcon from "@material-ui/icons/List"
import HomeIcon from "@material-ui/icons/Home"
import SettingsIcon from "@material-ui/icons/Settings"
import MenuIcon from "@material-ui/icons/Menu"

import Logo from "../logo"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
    [theme.breakpoints.down("sm")]: {
      width: 230,
    },
  },
}))

export default function Header() {
  const [open, setOpen] = useState(false)

  const classes = useStyles()
  const menuOptions = [
    {
      option: "Home",
      page: "HOME_PAGE",
      icon: <HomeIcon />,
    },
    {
      option: "Favourites",
      page: "NOW_PLAYING_PAGE",
      icon: <HeartIcon />,
    },
    {
      option: "Playlists",
      page: "PLAYLIST_PAGE",
      icon: <PlayListIcon />,
    },
    {
      option: "Settings",
      page: "SETTINGS_PAGE",
      icon: <SettingsIcon />,
    },
  ]

  const toggleDrawer = event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setOpen(prevState => !prevState)
  }

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Music App
          </Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <div
          style={{
            minHeight: "100px",
            justifyContent: "center",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Logo />
        </div>
        <Divider />
        {menuOptions.map(option => (
          <ListItem key={option.option} button className={classes.list}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText>{option.option}</ListItemText>
          </ListItem>
        ))}
      </SwipeableDrawer>
    </div>
  )
}
