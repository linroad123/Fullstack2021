import React from 'react'
import phonebookService from '../services/persons'


const Persons = ({ persons, setPersons, setFilteredPersons }) => {
    const updatedList = (id) => {
        const n = persons.filter(p => (p.id !== id))
        setFilteredPersons(n)
        setPersons(n)
    }

    return (
        <div>
            {persons.map(person =>
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => phonebookService.del(person.id)
                        .then(() => {
                            updatedList(person.id)
                        })}>delete</button>
                </p>

            )}
        </div>
    )
}
export default Persons