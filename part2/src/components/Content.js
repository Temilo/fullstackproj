import React from 'react';
import Part from "./Part";

const Content = ({ course }) => {
	console.log("course", course)
	return (
		<div>
			{course.parts.map((part) => part && <Part part={part} />)}
		</div>
	)
}

export default Content;