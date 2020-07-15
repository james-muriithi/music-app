import React from "react"
import PropTypes from "prop-types"

import SEO from "../seo/Seo"
import Header from "../header/Header"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <SEO />
      <Header />
      <div style={{ overflowX: "hidden" }}>
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
