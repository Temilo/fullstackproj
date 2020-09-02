import React from "react";
import Person from "./Person";

const Persons = (props) => {
	return (
		<div>
			{props.persons.map(person => <Person
				key={person.name}
				person={person}
				deleteHandler={props.deleteHandler}
			/>)}
		</div>
	)
}
export default Persons;