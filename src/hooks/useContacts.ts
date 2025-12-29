import { useEffect, useState } from 'react';
import { contactService } from '../services/contactService';
import { useContactsContext } from '../context/ContactsContext';
import { Contact } from '../types/contact';

export function useContacts() {
  const { contacts, setContacts } = useContactsContext();
  const [search, setSearch] = useState('');

  useEffect(() => {
    contactService.getContacts().then(setContacts);
  }, []);

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const addContact = async (contact: Contact) => {
    await contactService.addContact(contact);
    setContacts(prev => [...prev, contact]);
  };

  const removeContact = async (id: string) => {
    await contactService.removeContact(id);
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return {
    contacts: filteredContacts,
    setSearch,
    addContact,
    removeContact,
  };
}