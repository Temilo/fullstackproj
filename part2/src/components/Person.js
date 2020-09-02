import React from "react";

const Person = ({person, deleteHandler}) => {
	return (
		<div className="person">
			<p>{person.name} {person.number}</p>
			<button onClick={() => deleteHandler(person)}>delete</button>
		</div>
	)
}

// const Person = ({person}) => {
// 	return (
// 		<div>
// 			<h1>{person.name}</h1>
// 			<p>Capital: {person.capital}</p>
// 			<p>Population: {person.population}</p>
// 			<h2>Languages</h2>
// 			<ul>
// 				{person.languages.map(language => <li key={language.name}>{language.name}</li>)}
// 			</ul>
// 			<img src={person.flag}/>
// 		</div>
// 	)
// }

export default Person;