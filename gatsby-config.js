module.exports = {
  pathPrefix: `/`, // Change to `/running_page` when running on github pages
  siteMetadata: {
    siteTitle: 'iChen Workout Map',
    siteUrl: 'https://github.com/VHCC',
    logo: 'https://avatars.githubusercontent.com/u/11642721?s=400&u=4412167a6753900e7ba89622e3cfb199f98e7866&v=4',
    description: 'Personal site and blog',
    navLinks: [
      {
        name: 'Strava',
        url: 'https://www.strava.com/athletes/47512046',
      },
      {
        name: 'Blog',
        url: 'https://hexo.ichenprocin.dsmynas.com/VHCC/',
      },
      {
        name: 'About',
        url: 'https://vhcc.github.io/',
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'IBM Plex Mono',
        ],
        display: 'swap'
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/static/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/images/',
      },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        rootFolder: './',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-smartypants',
          'gatsby-remark-widows',
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              className: 'header-link',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#e1e1e1',
        theme_color: '#e1e1e1',
        display: 'minimal-ui',
        icon: 'src/images/pig-icon-png-14.jpg', // This path is relative to the root of the site.
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{userAgent: '*', allow: '/'}],
      },
    },
  ],
};
