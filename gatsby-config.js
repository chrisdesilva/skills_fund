require('dotenv').config({
	path: `.env`
});

module.exports = {
	siteMetadata: {
		title: `Skills Fund`,
		description: `We provide student loans for the best bootcamps and skills training programs. Skills Fund helps students access a quality education with fixed-rate, simple education financing. Use our loan calculator to know your full payment and terms before you apply.`,
		headline: `Student Loans for Bootcamps - Skills Fund: Finance Your Education`,
		author: `@Skills_Fund`,
		siteLanguage: `en`,
		logo: `src/images/skillsFund_logo.png`,
		favicon: `src/images/Favicon-SF.png`,
		keywords: `student loan, education financing, education loans, coding bootcamp funding, student lending, bootcamp lenders, best bootcamps, best online programs, best coding programs, best data science programs, best cybersecurity programs, best UX/UI programs`
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				postCssPlugins: [ require('tailwindcss'), require('./tailwind.config.js') ]
			}
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
				accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				display: `minimal-ui`,
				icon: `src/images/Favicon-SF.png` // This path is relative to the root of the site.
			}
		}
	]
};
