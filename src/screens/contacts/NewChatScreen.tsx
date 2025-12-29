import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Dummy data matching your screenshot
const CONTACTS_DATA = [
  { id: '1', name: 'Gloria', status: '😅', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', name: 'Robert Fox', status: 'Okay, I will', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', name: 'Jane Cooper', status: 'Desktop Support', image: 'https://randomuser.me/api/portraits/men/85.jpg' },
  { id: '4', name: 'Jacob Jones', status: '👍👍', image: 'https://randomuser.me/api/portraits/men/64.jpg' },
  { id: '5', name: 'Brandie ❣️', status: 'Done!!!🐶', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: '6', name: 'Lilly', status: '💜', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
];

export function NewChatScreen({ navigation }: { navigation: any }) {

  // Reusable Menu Item Component
  const renderMenuItem = (icon: string, label: string, onPress?: () => void) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={24} color="#fff" />
      </View>
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>New Chat</Text>
              <View style={{ width: 24 }} /> 
      </View>

      {/* Search Bar - (Matches your screenshot style) */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput 
          placeholder="Search..." 
          style={styles.searchInput}
          placeholderTextColor="#666"
        />
      </View>

      {/* Action Menu */}
      <View style={styles.menuContainer}>
        {renderMenuItem("people", "New Group")}
        
        {/* THIS connects to your AddContactScreen */}
        {renderMenuItem("person-add", "New Contact", () => {
          navigation.navigate('AddContact'); 
        })}
        
        {renderMenuItem("people-circle", "New Community")}
      </View>

      {/* Contacts List */}
      <Text style={styles.sectionHeader}>Contact on Manovate</Text>

      <FlatList
        data={CONTACTS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.name}</Text>
              {item.status ? <Text style={styles.contactStatus}>{item.status}</Text> : null}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, },  
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
  
  // Search Bar Styles
  searchContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#000', height: '100%' },

  menuContainer: { marginTop: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1C2E8A', // The specific blue from your screenshot
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: { fontSize: 16, fontWeight: '600', color: '#000' },
  
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  contactItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15, backgroundColor: '#eee' },
  contactInfo: { flex: 1, justifyContent: 'center' },
  contactName: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 2 },
  contactStatus: { fontSize: 14, color: '#666' },
});