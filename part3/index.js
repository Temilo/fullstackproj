require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/dbs.person")
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("reqBody", (req, res) => {
	return JSON.stringify(req.body);
})

app.use(morgan(":method :url :status  :res[content-length] - :response-time ms :reqBody"));

app.get("/", (req, res) => {
	res.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (req, res) => {
	Person.find({})
	.then((result) => {
		res.json(result)
	})
})

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
	.then((person) => {
		if (!person) res.status(404).end();
		else res.json(person);
	})
	.catch((err) => {
		next(err);
	})
})

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
	.then(function(result) {
		res.status(204).end();
	})
	.catch((err) => {
		next(err)
	})
})

app.post ("/api/persons", (req, res, next) => {
	const newPerson = req.body;
	if (!newPerson.name || !newPerson.number) {
		return res.status(400).json({
			error: "Name or number is missing"
		})
	}

	const personObj = {
		name: newPerson.name,
		number: newPerson.number,
	};

	const person = new Person(personObj);
	person.save()
	.then((savedNote) => savedNote.toJSON())
	.then((savedAndFormattedNote) => {
		res.json(savedAndFormattedNote);
	})
	.catch((err) => next(err))
});

app.get("/info", (req, res) => {
	Person.find({})
	.then((results) => {
		res.send(`<div><p>Phonebook has info for ${(results.length)} people</p><p>${new Date()}</p></div>`)
	})
});

app.put("/api/persons/:id", (req, res, next) => {
	var body = req.body;
	const person = {
		name: body.name,
		number: body.number
	}
	Person.findByIdAndUpdate(req.params.id, person, {new: true})
	.then((updatedPerson) => {
		res.json(updatedPerson)
	})
	.catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
	res.status(404).json({
		error: "unknown endpoint"
	})
}

app.use(unknownEndpoint);

const errorHandler = function (error, req, res, next) {
	console.log(error.message)
	if (error.name === "CastError") {
		return res.status(400).send({
			error: "Malformed Id"
		})
	} else if (error.name === "ValidationError"){
		return res.status(400).json({
			error: error.message
		})
	}
	next(error);
};

app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});