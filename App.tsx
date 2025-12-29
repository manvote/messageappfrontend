import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ContactsProvider } from './src/context/ContactsContext';
import { PresenceProvider } from './src/context/PresenceContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <PresenceProvider userId="test-user-1">
      <ContactsProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ContactsProvider>
    </PresenceProvider>
  );
}