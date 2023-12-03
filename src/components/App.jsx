import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  addContact = ({ name, number }) => {
    const lowerCaseName = name.toLowerCase();
    let isAdded = false;
    this.state.contacts.forEach(contact => {
      if (contact.name.toLowerCase() === lowerCaseName) {
        alert(`${name} is already in your contact list.`);
        isAdded = true;
      }
      if (contact.number === number) {
        alert(`${name} cannot have the same number as your other contact.`);
        isAdded = true;
      }
    });
    if (isAdded) {
      return;
    }
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    const lowerCaseFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
    return filterContacts;
  };

  deleteContact = delId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== delId),
    }));
  };

  render() {
    const { filter } = this.state;
    const generateContacts = this.getContacts();

    return (
      <div className={css.container}>
        <h1 className={css.titles}>Phonebook</h1>
        <ContactForm generateId={uuidv4()} onSubmit={this.addContact} />
        <h2 className={css.titles}>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilter} />
        <ContactList
          contacts={generateContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
