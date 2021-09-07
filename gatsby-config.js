module.exports = {
    siteMetadata: {
        title: `Thai-Nam Hoang`,
        description: `An autodadict machine learning enthusiast`,
        author: `Thai-Nam Hoang`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-image`,
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-resolve-src`,
        `gatsby-plugin-remove-trailing-slashes`,
        `gatsby-plugin-emotion`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: '@prismicio/gatsby-source-prismic-graphql',
            options: {
                repositoryName: 'thainamhoang', // (REQUIRED, replace with your own)
                linkResolver: () => post => `/${post.uid}`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `thainamhoang`,
                short_name: `thainamhoang`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`, // This path is relative to the root of the site.
            },
        },
    ],
};
