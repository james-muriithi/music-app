import React from "react"
import PropTypes from "prop-types"

import SEO from "../seo/Seo"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <SEO />
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
