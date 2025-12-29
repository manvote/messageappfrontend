import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Import all your screens
import { ContactsListScreen } from '../screens/contacts/ContactsListScreen';
import { AddContactScreen } from '../screens/contacts/AddContactScreen';
import { NewChatScreen } from '../screens/contacts/NewChatScreen'; // Import the new screen

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: false, // This hides the default top bar so your custom designs show up
      }}
    >
      <Stack.Screen
        name="Contacts"
        component={ContactsListScreen}
      />
      
      {/* 2. Add the New Chat Screen here */}
      <Stack.Screen
        name="NewChat"
        component={NewChatScreen}
      />

      <Stack.Screen
        name="AddContact"
        component={AddContactScreen}
      />
    </Stack.Navigator>
  );
}