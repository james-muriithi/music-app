import React from "react"
import Layout from "../components/layout"
import Header from "../components/header/Header"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(11),
    textAlign: "center",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(7),
    },
    "& img": {
      width: "100%",
      height: "500px",
    },
  },
}))

export default function NotFoundPage() {
  const classes = useStyles()

  return (
    <Layout>
      <Header noSearch />
      <div className={classes.root}>
        <img src={require("../images/404.svg")} alt="404 page" />
        <h4 style={{ fontWeight: 600 }}>Page was not found</h4>
      </div>
    </Layout>
  )
}
