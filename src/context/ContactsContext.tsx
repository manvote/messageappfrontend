import React, { createContext, useContext, useState } from 'react';
import { Contact } from '../types/contact';

interface ContactsContextType {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const ContactsContext = createContext<ContactsContextType | null>(null);

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  return (
    <ContactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsContext = () => {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error('ContactsContext missing');
  return ctx;
};