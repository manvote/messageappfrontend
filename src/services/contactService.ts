import { Contact } from '../types/contact';

let MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Arjun', phone: '9999999999' },
  { id: '2', name: 'Ravi', phone: '8888888888' },
];

export const contactService = {
  async getContacts(): Promise<Contact[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_CONTACTS), 300);
    });
  },

  async addContact(contact: Contact) {
    MOCK_CONTACTS.push(contact);
  },

  async removeContact(id: string) {
    MOCK_CONTACTS = MOCK_CONTACTS.filter(c => c.id !== id);
  },
};