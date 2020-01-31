import React, { useState } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { FaArrowLeft } from 'react-icons/fa';

const SchoolSelector = (props) => {
	let [ schools, setSchools ] = useState(props.allSchools); // holds current set of schools, updates with filter
	const [ prevSchools, setPrevSchools ] = useState(null); // holds previous step's list of filtered schools in case user goes back a step

	const resetFilters = () => {
		setSchools(props.allSchools);
	};

	const setSchedule = (isPartTime) => {
		setPrevSchools(schools);
		if (isPartTime) {
			schools = props.allSchools.filter((school) => school.hasPartTime);
		} else {
			schools = props.allSchools;
		}
		setSchools(schools);
	};

	const setOnline = (isOnline) => {
		setPrevSchools(schools);
		schools = schools.filter((school) => school.hasOnline);
		setSchools(schools);
	};

	const setRegion = (e) => {
		const region = e.target.value.toLowerCase();
		setPrevSchools(schools);
		schools = schools.filter((school) => school.states.includes(region));
		setSchools(schools);
	};

	const setProgram = (program) => {
		setPrevSchools(schools);
		schools = schools.filter((school) => school.programsOffered.includes(program));

		setSchools(schools);
	};

	return (
		<div className="schoolsList">
			<div className="schoolsFilter" />

			<div className="schoolsList__final">
				{schools.map((school) => {
					return (
						<div key={school.schoolname} className="schoolsList__school show">
							<h3>{school.schoolname}</h3>
							<Link to={`/schools/${school.slug}`}>
								<div className="schoolsList__img">
									<img src={school.schoolLogo.file.url} alt={school.schoolname} />
								</div>
							</Link>
							<Link className="schoolsList__link" to={`/schools/${school.slug}`}>
								Get Funded
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SchoolSelector;
