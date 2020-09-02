import axios from 'axios';
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
	return axios
	.get(baseURL)
	.then(resp => resp.data)
}

const addPerson = newPerson => {
	return axios
	.post(baseURL, newPerson)
	.then(resp => resp.data)
}

const deletePerson = personId => {
	return axios
	.delete(`${baseURL}/${personId}`)
}

const updatePerson = (updatedPerson) => {
	return axios
	.put(`${baseURL}/${updatedPerson.id}`, updatedPerson)
	.then(resp => resp.data)
}

export default {getAll, addPerson, deletePerson, updatePerson}