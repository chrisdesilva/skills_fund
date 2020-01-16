import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import SchoolSelector from '../components/schoolSelector';

import USAMap from 'react-usa-map';

const Schools = ({ data }) => {
	// get all schools and return an array with each school's information
	let allSchools = data.schools.edges.map((school) => {
		return school.node;
	});

	const [ locations, setLocations ] = useState(allSchools.map((school) => school.states).flat());
	const fillColor = '#9d1996';

	const mapHandler = (e) => {};

	const statesCustomConfig = () => {
		return {
			AK: {
				fill: locations.includes('ak') ? fillColor : null,
				clickHandler: locations.includes('ak')
					? (e) => {
							console.log(locations);
						}
					: null
			},
			AL: {
				fill: locations.includes('al') ? fillColor : null
			},
			AR: {
				fill: locations.includes('ar') ? fillColor : null
			},
			AZ: {
				fill: locations.includes('az') ? fillColor : null
			},
			CA: {
				fill: locations.includes('ca') ? fillColor : null,
				clickHandler: locations.includes('ca')
					? (e) => {
							alert(
								allSchools
									.filter((school) => school.states.includes('ca'))
									.map((school) => school.schoolname)
							);
						}
					: null
			},
			CO: {
				fill: locations.includes('co') ? fillColor : null
			},
			CT: {
				fill: locations.includes('ct') ? fillColor : null
			},
			DC2: {
				fill: locations.includes('dc') ? fillColor : null
			},
			DE: {
				fill: locations.includes('de') ? fillColor : null
			},
			FL: {
				fill: locations.includes('fl') ? fillColor : null
			},
			GA: {
				fill: locations.includes('ga') ? fillColor : null
			},
			HI: {
				fill: locations.includes('hi') ? fillColor : null
			},
			IA: {
				fill: locations.includes('ia') ? fillColor : null
			},
			ID: {
				fill: locations.includes('id') ? fillColor : null
			},
			IL: {
				fill: locations.includes('il') ? fillColor : null
			},
			IN: {
				fill: locations.includes('in') ? fillColor : null
			},
			KS: {
				fill: locations.includes('ks') ? fillColor : null
			},
			KY: {
				fill: locations.includes('ky') ? fillColor : null
			},
			LA: {
				fill: locations.includes('la') ? fillColor : null
			},
			MA: {
				fill: locations.includes('ma') ? fillColor : null
			},
			MD: {
				fill: locations.includes('md') ? fillColor : null
			},
			ME: {
				fill: locations.includes('me') ? fillColor : null
			},
			MI: {
				fill: locations.includes('mi') ? fillColor : null
			},
			MN: {
				fill: locations.includes('mn') ? fillColor : null
			},
			MO: {
				fill: locations.includes('mo') ? fillColor : null
			},
			MS: {
				fill: locations.includes('ms') ? fillColor : null
			},
			MT: {
				fill: locations.includes('mt') ? fillColor : null
			},
			NC: {
				fill: locations.includes('nc') ? fillColor : null
			},
			ND: {
				fill: locations.includes('nd') ? fillColor : null
			},
			NE: {
				fill: locations.includes('ne') ? fillColor : null
			},
			NH: {
				fill: locations.includes('nh') ? fillColor : null
			},
			NJ: {
				fill: locations.includes('nj') ? fillColor : null
			},
			NM: {
				fill: locations.includes('nm') ? fillColor : null
			},
			NV: {
				fill: locations.includes('nv') ? fillColor : null
			},
			NY: {
				fill: locations.includes('ny') ? fillColor : null
			},
			OH: {
				fill: locations.includes('oh') ? fillColor : null
			},
			OK: {
				fill: locations.includes('ok') ? fillColor : null
			},
			OR: {
				fill: locations.includes('or') ? fillColor : null
			},
			PA: {
				fill: locations.includes('pa') ? fillColor : null
			},
			RI: {
				fill: locations.includes('ri') ? fillColor : null
			},
			SC: {
				fill: locations.includes('sc') ? fillColor : null
			},
			SD: {
				fill: locations.includes('sd') ? fillColor : null
			},
			TN: {
				fill: locations.includes('tn') ? fillColor : null
			},
			TX: {
				fill: locations.includes('tx') ? fillColor : null,
				clickHandler: locations.includes('tx')
					? (e) => {
							alert(
								allSchools
									.filter((school) => school.states.includes('tx'))
									.map((school) => school.schoolname)
							);
						}
					: null
			},
			UT: {
				fill: locations.includes('ut') ? fillColor : null,
				clickHandler: locations.includes('ut')
					? (e) => {
							alert(
								allSchools
									.filter((school) => school.states.includes('ut'))
									.map((school) => school.schoolname)
							);
						}
					: null
			},
			VA: {
				fill: locations.includes('va') ? fillColor : null
			},
			VT: {
				fill: locations.includes('vt') ? fillColor : null
			},
			WA: {
				fill: locations.includes('wa') ? fillColor : null
			},
			WI: {
				fill: locations.includes('wi') ? fillColor : null
			},
			WV: {
				fill: locations.includes('wv') ? fillColor : null
			},
			WY: {
				fill: locations.includes('wy') ? fillColor : null
			}
		};
	};

	return (
		<Layout>
			<SEO title="Schools" />
			<div className="schools flex flex-col">
				<USAMap customize={statesCustomConfig()} onClick={mapHandler} defaultFill="#54cadc" />
				<SchoolSelector
					allSchools={allSchools}
					climbers={data.climbers.childImageSharp.fluid}
					noMatches={data.noMatches.childImageSharp.fluid}
					fullOrPart={data.fullOrPart.childImageSharp.fluid}
					location={data.location.childImageSharp.fluid}
					program={data.program.childImageSharp.fluid}
					inPersonOnline={data.inPersonOnline.childImageSharp.fluid}
				/>
			</div>
		</Layout>
	);
};

export default Schools;

export const pageQuery = graphql`
	{
		schools: allContentfulSchool {
			edges {
				node {
					hasOnline
					hasPartTime
					hasFullTime
					programsOffered
					schoolLogo {
						file {
							url
						}
					}
					schoolname
					slug
					states
				}
			}
		}
		climbers: file(relativePath: { eq: "Climbers_Color.png" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
		noMatches: file(relativePath: { eq: "balancing.png" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
		fullOrPart: file(relativePath: { eq: "student_at_desk.png" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
		location: file(relativePath: { eq: "america_purple.png" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
		program: file(relativePath: { eq: "cert_color.png" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
		inPersonOnline: file(relativePath: { eq: "class_color.png" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;
