import { useState, useEffect } from 'react'
import './App.css'
import ContactForm from './components/Form/ContactForm'
import ContactList from './components/ContactList/ContactList'
import SearchBox from './components/SearchBox/SearchBox'

const initialContacts = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
]

function App() {
  const [contacts, setContact] = useState(() => {
    const savedContact = window.localStorage.getItem("saved-contacts");

    return savedContact ? JSON.parse(savedContact) : initialContacts;
  });

  const [filter, setFilter] = useState('');

  const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, ''); 
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`; 
    }
    return number; 
  }
  
  const addContact = (newCon) => {
    const formattedContact = {
      ...newCon,
      number: formatPhoneNumber(newCon.number) 
    };
    
    setContact((prevContacts) => {
      return [...prevContacts, formattedContact];
    });
  }
  

  const deleteContact = (contactId) => {
    setContact((prevContacts) => {
      return prevContacts.filter(contact => contact.id !== contactId);
    })
  }

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    window.localStorage.setItem("saved-contacts", JSON.stringify(contacts));
  }, [contacts]);
  
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact}/>
      <SearchBox value={filter}  handleChange={setFilter} />
      <ContactList onDelete={deleteContact} contacts={visibleContacts}/>
    </>
  )
}

export default App;