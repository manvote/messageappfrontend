import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export function SearchBar({ onChange }: { onChange: (t: string) => void }) {
  return (
    <TextInput
      placeholder="Search contacts"
      style={styles.input}
      onChangeText={onChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    margin: 12,
  },
});