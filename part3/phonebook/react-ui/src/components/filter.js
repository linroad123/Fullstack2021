import React from 'react'

const Filter = ({ persons, setFilteredPersons }) => {
    const search = (event) => {
        const input = event.target.value.toLowerCase()
        if (input === '')
            setFilteredPersons(persons)
        else
            setFilteredPersons(persons.filter(person =>
                person.name.toLowerCase().includes(input)))
    }
    return (
        <div>
            filter shown with:
            <input onChange={search} />
        </div>
    )
}

export default Filter