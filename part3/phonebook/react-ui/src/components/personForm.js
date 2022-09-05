import React from "react";
import phonebookService from "../services/persons";

const PersonForm = (
  {
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    persons,
    setPersons,
    setFilteredPersons,
    setNotification,
    setError,
  },
) => {
  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.find((e) => e.name === newName);
    if (found) {
      const dialog = window.confirm(
        `${newName} is already added to phonebook, replace the old nmber with a new one?`,
      );
      if (dialog) {
        phonebookService
          .update(found.id, { ...found, number: newNumber })
          .then((response) => {
            const updated = persons.map((person) =>
              person.id === found.id ? response : person
            );
            setPersons(updated);
            setFilteredPersons(updated);

            setNotification(`Number of ${response.name} was updated!`);
            setTimeout(() => setNotification(null), 5000);
          })
          .catch((error) => {
            setError(`Number of ${found.name} was already deleted!`);
            setTimeout(() => setError(null), 5000);

            const updated = persons.filter((person) => person.id !== found.id);
            setPersons(updated);
            setFilteredPersons(updated);
          });
      }
    } else {
      phonebookService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((response) => {
          setPersons(persons.concat(response));
          setFilteredPersons(persons.concat(response));

          setNotification(`Added ${response.name}`);
          setTimeout(() => setNotification(null), 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
