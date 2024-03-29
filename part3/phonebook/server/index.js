require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
// const person = require("./models/person");

const Person = require("./models/person");

app.use(express.static(path.resolve(__dirname, "../react-ui/build")));
app.use(express.json());

// Setting up port:
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Morgan configuration
morgan.token("body", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
app.put("/api/persons/:id", (request, response, next) => {
  const { name, body } = request.body;

  Person.findByIdAndUpdate(request.params.id, { name, body }, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then((r) =>
    response.status(204).end()
  );
});
app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  if (body.name && body.number) {
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    let error = person.validateSync();

    person.save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch(error => {
        // console.log(error.response.data.error);
        console.log("-----------");
        console.log(error.name)
        console.log(error.message)
        console.log("-----------");

        next(error)
      });
  } else {
    return response.status(400).json({ error: "content missing" });
  }
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p>
            <p>${Date()}</p>`,
    );
  });
});


app.use(errorHandler);