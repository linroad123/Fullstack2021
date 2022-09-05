import React, { useState, useEffect } from 'react'
import phonebookService from './services/persons'
import Persons from './components/persons'
import PersonForm from './components/personForm'
import Filter from './components/filter'

const Notification = ({ message }) => {
    if (message === null)
        return null
    return <div className='notification'>{message}</div>
}
const Error = ({ message }) => {
    if (message === null)
        return null
    return <div className='error'>{message}</div>
}
const App = () => {
    const [persons, setPersons] = useState([])
    const [filteredPersons, setFilteredPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const [notification, setNotification] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        phonebookService
            .get()
            .then(response => {
                setPersons(response)
                setFilteredPersons(response)
            })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} />
            <Error message={error} />
            <Filter persons={persons} setFilteredPersons={setFilteredPersons} />
            <h3>Add a new</h3>
            <PersonForm
                newName={newName} setNewName={setNewName}
                newNumber={newNumber} setNewNumber={setNewNumber}
                persons={persons} setPersons={setPersons}
                setFilteredPersons={setFilteredPersons}
                setNotification={setNotification} 
                setError={setError} />
            <h3>Numbers</h3>
            <Persons persons={filteredPersons} setPersons={setPersons}
                setFilteredPersons={setFilteredPersons} />
        </div>
    )
}

export default App