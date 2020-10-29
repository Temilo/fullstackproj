require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
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
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(() => {
	console.log("Connected to MONGODB");
})
.catch((error) => {
	console.log("Error connecting to MONGODB: ", error.message)
})

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	number: {
		type: String,
		required: true,
		minlength: 8
	}
});

schema.plugin(uniqueValidator);

schema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Person", schema);