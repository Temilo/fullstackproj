import React, {useEffect, useState} from 'react';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personServices from "./services/persons"


const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ search, setSearch ] = useState('')
	const [ filtered, setFiltered ] = useState(persons)
	const [ errorMessage, setErrorMessage ] = useState("")

	useEffect(() => {
		personServices.getAll()
		.then(initPersons => {
			setPersons(initPersons);
			setFiltered(initPersons);
		})
	}, [])
	const addNewName = (e) => {
		e.preventDefault();
		const duplicatePerson = persons.find(person => person.name === newName)
		if (duplicatePerson) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				return updatePerson(duplicatePerson)
			}
		} else {
			personServices.addPerson({
				name: newName,
				number: newNumber
			})
			.then(newPerson => {
				setPersons(persons.concat(newPerson))
				setFiltered(persons.concat(newPerson))
				showNotif(`${newPerson.name} successfully added`)
				setNewName("")
				setNewNumber("")
			})
			.catch((err) => {
				console.log(err.response.data);
				showNotif(err.response.data.error);
			})
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	}

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
		console.log(event.target.value);
		setFiltered(persons.filter(function(person) {
			return person.name.indexOf(event.target.value) > -1
		}))
	}

	const deletePerson = person => {
		if (!window.confirm(`Delete ${person.name} ?`)) return;
		personServices.deletePerson(person.id)
		.then(() => personServices.getAll())
		.then(persons => {
			setPersons(persons);
			setFiltered(persons);
		})
		.then(() => {
			showNotif(`${person.name} successfully deleted`)
		})
		.catch(error => {
			setErrorMessage('Error')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
			setPersons(persons.filter(p => p.id !== person.id))
		})
	}

	const updatePerson = person => {
		const updatedPerson = {...person, number: newNumber};
		return personServices.updatePerson(updatedPerson)
		.then(resp => {
			const updatedPersons = persons.map(p => p.id === resp.id ? resp : p);
			showNotif(`${resp.name}'s number has been successfully updated to ${resp.number}`)
			setPersons(updatedPersons)
			setFiltered(updatedPersons)
			setNewName('')
			setNewNumber('')
		})
		.catch(error => {
			showNotif(`Information on ${person.name} has already been removed from the server`)
		})
	}

	const showNotif = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000);
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={errorMessage} />
			<Filter searchChangeHandler={handleSearchChange} search={search}/>
			<h3>add a new</h3>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				onSubmit={addNewName}
				nameChangeHandler = {handleNameChange}
				numberChangeHandler = {handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={filtered} deleteHandler={deletePerson}/>
		</div>

	)
}

export default App