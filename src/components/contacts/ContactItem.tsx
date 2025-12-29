import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Contact } from '../../types/contact';
import { OnlineIndicator } from '../presence/OnlineIndicator';

export function ContactItem({
  contact,
  onDelete,
}: {
  contact: Contact;
  onDelete: () => void;
}) {
  return (
    <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
      <View>
        <Text>{contact.name}</Text>
        <Text>{contact.phone}</Text>
      </View>
      <OnlineIndicator online={true} />
      <TouchableOpacity onPress={onDelete}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}