import React from 'react';

const Total = ({ course }) => {
	const reducer = (total, current) => total + current.exercises;
	const sum = course.parts.reduce(reducer, 0)
	return(
		<p>Total of {sum} exercises</p>
	)
}

export default Total;