const mongoose = require('mongoose');
var showAll;

if (process.argv.length <= 3) {
	showAll = true;
	// process.exit(1)
}

const password = process.argv[2];
const newEntry = {
	name: process.argv[3],
	number: process.argv[4]
};
const url = `mongodb+srv://fullstack:${password}@cluster0.wcavx.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

const schema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", schema);

if (showAll) {
	Person.find({})
	.then((result) => {
		console.log("Phonebook:");
		result.forEach((person) => {
			console.log(`${person.name} ${person.number}`);
		})
		mongoose.connection.close();
	})
} else {
	const person = new Person(newEntry);
	person.save()
	.then((result)=> {
		console.log(`added ${result.name} number ${result.number} to phonebook`);
		mongoose.connection.close();
	});
}