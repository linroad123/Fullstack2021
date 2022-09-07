const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>",
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const dbname = "phonephone";
// `mongodb+srv://fullstack:${password}@cluster0.zj2ol.azure.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const url =
  `mongodb+srv://luphonebook:W3z6GppXVqQQZetd@phonebook.wwmrwbb.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  },
});
personSchema.plugin(uniqueValidator);

const Person = mongoose.model("Person", personSchema);

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person
    .find({})
    .then((persons) => {
      console.log("phonebook:");
      for (const person of persons) {
        console.log(person.name + " " + person.number);
      }
      mongoose.connection.close();
    });
}
