import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import USAMap from 'react-usa-map';

const USMap = () => {
	const data = useStaticQuery(graphql`
		query {
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
		}
	`);

	let allSchools = data.schools.edges.map((school) => {
		return school.node;
	});
	const [ locations, setLocations ] = useState(allSchools.map((school) => school.states).flat());
	const fillColor = '#9d1996';

	const mapHandler = (e) => {};

	const statesCustomConfig = () => {
		return locations.reduce(
			(o, key) => ({
				...o,
				[key.toUpperCase()]: {
					fill: fillColor,
					clickHandler: (e) => {
						alert(
							allSchools
								.filter((school) => school.states.includes(key))
								.map((school) => school.schoolname)
						);
					}
				}
			}),
			{}
		);
	};

	return (
		<div>
			<USAMap customize={statesCustomConfig()} onClick={mapHandler} defaultFill="#54cadc" />
		</div>
	);
};

export default USMap;
