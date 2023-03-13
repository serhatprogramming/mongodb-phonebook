const mongoose = require("mongoose");

if (process.argv.length < 5) {
  console.log(`give the following arguments
  <password>
  <name - one word or in double quotes multiple words>
  <phone>`);
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@fshelsinki.ayficlf.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((result) => {
  console.log("added", result.name, result.number, "to phonebook");
  mongoose.connection.close();
});

Person.find({}).then((people) => {
  people.forEach((person) => console.log(person.name, person.number));
  mongoose.connection.close();
});
