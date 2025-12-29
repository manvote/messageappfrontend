import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Platform,      // 1. Import Platform
  StatusBar      // 2. Import StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContacts } from '../../hooks/useContacts';

export function AddContactScreen({ navigation }: { navigation: any }) {
  const { addContact } = useContacts();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    const fullName = `${firstName} ${lastName}`.trim();
    
    addContact({ 
      id: Date.now().toString(), 
      name: fullName, 
      phone,
      email 
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Contact</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.formContainer}>
        
        {/* First Name */}
        <View style={styles.inputRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="person" size={20} color="#0066CC" />
          </View>
          <TextInput 
            style={styles.input} 
            placeholder="First Name" 
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        {/* Last Name */}
        <View style={styles.inputRow}>
          <View style={styles.iconContainer} /> 
          <TextInput 
            style={styles.input} 
            placeholder="Last Name" 
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Phone Number */}
        <View style={styles.inputRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="call" size={20} color="#0066CC" />
          </View>
          <View style={styles.phoneContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <View style={styles.verticalDivider} />
            <TextInput 
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]} 
              placeholder="Phone number" 
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail" size={20} color="#0066CC" />
          </View>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Contact</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // FIX: Add padding for Android Status Bar + extra breathing room
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    
    paddingHorizontal: 20,
    // FIX: Increased vertical padding so it doesn't look cramped near the top
    paddingVertical: 20, 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
   
  },
  formContainer: {
    padding: 20,
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end', 
    marginBottom: 25,
  },
  iconContainer: {
    width: 30,
    marginRight: 10,
    alignItems: 'center',
    paddingBottom: 8, 
  },
  input: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#0066CC', 
    fontSize: 16,
    paddingVertical: 8,
    color: '#000',
  },
  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#0066CC',
  },
  countryCode: {
    fontSize: 16,
    color: '#000',
    marginRight: 10,
    marginBottom: 2,
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#000',
    marginRight: 10,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#0066CC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});