import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  StatusBar, 
  Image, 
  TextInput,
  Animated,
  BackHandler
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CHAT_DATA = [
  { id: '1', name: 'Gloria', message: 'Sup Dude?🤣', time: '14:33', unread: 1, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', name: 'Robert Fox', message: 'Okay, I will check...', time: '14:24', unread: 1, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', name: 'Jane Cooper', message: '✓ Sure', time: '17:52', unread: 0, avatar: 'https://randomuser.me/api/portraits/men/85.jpg' },
  { id: '4', name: 'Jacob Jones', message: '👍👍', time: 'Yesterday', unread: 0, avatar: 'https://randomuser.me/api/portraits/men/64.jpg' },
  { id: '5', name: 'Brandie ❣️', message: 'Done!!!🐶', time: 'Yesterday', unread: 0, avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: '6', name: 'Lilly', message: '💜', time: 'Yesterday', unread: 0, avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '7', name: 'Annie', message: '🤣🤣🤣', time: 'Yesterday', unread: 0, avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
];

export function ContactsListScreen({ navigation }: { navigation: any }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Animation Value (0 = Hidden, 1 = Visible)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Handle Search Animation
  useEffect(() => {
    if (isSearchActive) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isSearchActive]);

  // Handle Hardware Back Button (Android)
  useEffect(() => {
    const backAction = () => {
      if (isSearchActive) {
        closeSearch();
        return true; // Prevent default behavior (exit app)
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [isSearchActive]);

  const filteredData = CHAT_DATA.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };

  const renderChatItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={[styles.time, item.unread > 0 && styles.activeTime]}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.message} numberOfLines={1}>
            {item.name === 'Jane Cooper' ? <Ionicons name="checkmark-done-outline" size={16} color="#0066CC" /> : null} 
            {item.message}
          </Text>
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 1. Transparent Status Bar */}
      <StatusBar 
        backgroundColor="transparent" 
        barStyle={isSearchActive ? "dark-content" : "light-content"} 
        translucent={true}
      />

      {/* 2. Status Bar Background (Blue by default, White when searching) */}
      <View style={[
        styles.statusBarBackground, 
        { backgroundColor: isSearchActive ? '#fff' : '#0066CC' }
      ]} />

      {/* --- HEADER CONTAINER --- */}
      <View style={styles.headerContainer}>
        
        {/* A. NORMAL HEADER (Blue) */}
        <View style={styles.normalHeaderContent}>
          <View style={styles.topBar}>
            <Text style={styles.headerTitle}>Manovate Web</Text>
            <View style={styles.headerIcons}>
              
              <TouchableOpacity onPress={() => setIsSearchActive(true)}>
                <Ionicons name="search" size={24} color="#fff" style={styles.iconSpacing} />
              </TouchableOpacity>
              <TouchableOpacity><Ionicons name="ellipsis-vertical" size={24} color="#fff" /></TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabBar}>
             <TouchableOpacity style={styles.tabItem}><Ionicons name="camera" size={20} color="rgba(255,255,255,0.6)" /></TouchableOpacity>
             <TouchableOpacity style={[styles.tabItem, styles.activeTab]}><Text style={styles.activeTabText}>CHATS</Text></TouchableOpacity>
             <TouchableOpacity style={styles.tabItem}><Text style={styles.tabText}>STATUS</Text></TouchableOpacity>
             <TouchableOpacity style={styles.tabItem}><Text style={styles.tabText}>CALLS</Text></TouchableOpacity>
          </View>
        </View>

        {/* B. SEARCH HEADER (White Overlay) 
            - Positioned Absolute to sit ON TOP of the Normal Header
            - Fade Animation for smooth "visible" effect
        */}
        {isSearchActive && (
          <Animated.View style={[styles.searchOverlay, { opacity: fadeAnim }]}>
            <TouchableOpacity onPress={closeSearch}>
              <Ionicons name="arrow-back" size={24} color="#666" />
            </TouchableOpacity>
            <TextInput 
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#999"
              autoFocus={true}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            )}
          </Animated.View>
        )}
      </View>

      {/* --- CONTENT --- */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* --- FAB --- */}
      {!isSearchActive && ( // Hide FAB when searching
        <TouchableOpacity onPress={() => navigation.navigate('NewChat')} style={styles.fab}>
          <Ionicons name="chatbox-ellipses" size={24} color="white" />
        </TouchableOpacity>
      )}

      {/* --- BOTTOM BAR --- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomNavItem}><Ionicons name="time-outline" size={24} color="#666" /><Text style={styles.bottomNavText}>Updates</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}><Ionicons name="call-outline" size={24} color="#666" /><Text style={styles.bottomNavText}>Calls</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}><Ionicons name="people-outline" size={24} color="#666" /><Text style={styles.bottomNavText}>Communities</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}><Ionicons name="chatbubble" size={24} color="#0066CC" /><Text style={[styles.bottomNavText, { color: '#0066CC', fontWeight: 'bold' }]}>Chats</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  // Status Bar Spacer
  statusBarBackground: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    zIndex: 10, // Ensure it sits on top
  },

  // Header Container (Holds both Normal and Search headers)
  headerContainer: {
    backgroundColor: '#0066CC',
    elevation: 4,
    zIndex: 5,
    position: 'relative', // Needed for absolute positioning of children
  },

  // Normal Header
  normalHeaderContent: {
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  headerIcons: { flexDirection: 'row' },
  iconSpacing: { marginRight: 20 },

  // Tabs
  tabBar: { flexDirection: 'row', alignItems: 'center' },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  tabText: { color: 'rgba(255,255,255,0.7)', fontWeight: '600', fontSize: 14 },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#fff' },
  activeTabText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // Search Overlay (The Magic Part)
  searchOverlay: {
    position: 'absolute', // Sits on top of Normal Header
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff', // White background covers the Blue
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 5, // Higher elevation than normal header
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    marginLeft: 15,
    color: '#000',
    height: '100%', // Full height to avoid clipping
  },

  // List Items
  chatItem: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15, backgroundColor: '#eee' },
  chatContent: { flex: 1, justifyContent: 'center' },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  time: { fontSize: 12, color: '#666' },
  activeTime: { color: '#0066CC' },
  chatFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  message: { fontSize: 14, color: '#666', flex: 1, marginRight: 10 },
  badge: { backgroundColor: '#0066CC', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  // FAB
  fab: {
    position: 'absolute', right: 20, bottom: 90, 
    backgroundColor: '#0066CC', width: 56, height: 56, borderRadius: 16, 
    justifyContent: 'center', alignItems: 'center', elevation: 5,
  },

  // Bottom Bar
  bottomBar: {
    flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff',
    paddingVertical: 10, position: 'absolute', bottom: 0, left: 0, right: 0,
  },
  bottomNavItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottomNavText: { fontSize: 10, marginTop: 4, color: '#666' },
});