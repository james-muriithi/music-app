module.exports = {
  siteMetadata: {
    title: `Music App - Listen to your favourite local music`,
    description: `A simple reactjs, gatsby project to listen to local music.`,
    author: `@james-muriithi`,
    siteUrl: "https://my-online-shop.netlify.app/",
    siteLanguage: `en`,
    ogLanguage: `en`,
    headline: `Music App`,
    twitter: `@jam_es_muriithi`,
    facebook: `james-muriithi`,
    banner: `/preview.png`,
    theme: "#512DA8",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#512DA8`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
