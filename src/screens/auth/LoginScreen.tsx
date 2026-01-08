import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import styles from './styles/login.style';

// Country data with dial codes
const COUNTRIES = [
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳' },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷' },
  { name: 'Brazil', code: 'BR', dialCode: '+55', flag: '🇧🇷' },
  { name: 'Japan', code: 'JP', dialCode: '+81', flag: '🇯🇵' },
  { name: 'China', code: 'CN', dialCode: '+86', flag: '🇨🇳' },
  { name: 'Russia', code: 'RU', dialCode: '+7', flag: '🇷🇺' },
  { name: 'South Korea', code: 'KR', dialCode: '+82', flag: '🇰🇷' },
  { name: 'Singapore', code: 'SG', dialCode: '+65', flag: '🇸🇬' },
  { name: 'UAE', code: 'AE', dialCode: '+971', flag: '🇦🇪' },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦' },
];

// Local stub for login
async function login(phone: string) {
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      console.log(phone);
      resolve(undefined);
    }, 1500),
  );

  return true;
}

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryCode, setCountryCode] = useState(COUNTRIES[0].dialCode);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const countryCodeRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setCountryCode(selectedCountry.dialCode);
  }, [selectedCountry]);

  const handleLogin = async () => {
    const fullPhoneNumber = countryCode + phoneNumber;

    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Enter a valid phone number');
      phoneInputRef.current?.focus();
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await login(fullPhoneNumber);
      navigation.navigate('Otp', { phone: fullPhoneNumber });
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Enter your phone number</Text>
              <Text style={styles.subtitle}>
                Manovate web app will send you an OTP to verify your phone
                number.
                <Text style={styles.whatsMyNumber}> Whats my number?</Text>
              </Text>
            </View>

            {/* Country selector */}
            <TouchableOpacity
              style={styles.countryDropdown}
              onPress={() => setShowCountryModal(true)}
            >
              <Text style={styles.countryName}>{selectedCountry.name}</Text>
              {/* CHANGED: Use Icon component */}

              <Icon name="caret-down" size={20} color="#000" />
            </TouchableOpacity>

            {/* Inputs */}
            <View style={styles.inputContainer}>
              <View style={styles.countryCodeWrapper}>
                <TextInput
                  ref={countryCodeRef}
                  value={countryCode}
                  style={styles.countryCodeInput}
                  editable={false}
                />
              </View>

              <View style={styles.phoneInputWrapper}>
                <TextInput
                  ref={phoneInputRef}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={(t) => setPhoneNumber(t.replace(/\D/g, ''))}
                  style={styles.phoneInput}
                />
              </View>
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                {/* CHANGED: Use Icon component */}
                <Icon name="alert-circle-outline" size={16} color="#FF6B6B" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              disabled={isLoading}
              onPress={handleLogin}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Next</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Modal */}
      <Modal visible={showCountryModal} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <TextInput
            placeholder="Search country"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => {
                  setSelectedCountry(item);
                  setShowCountryModal(false);
                }}
              >
                <Text> {item.name}</Text>
                <Text>{item.dialCode}</Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
