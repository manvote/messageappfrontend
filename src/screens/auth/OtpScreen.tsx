import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import styles from './styles/otp.style';
import { verifyOTP } from '../../services/authServices';
import { storeToken } from '../../utils/tokenStorage';

const OTP_LENGTH = 6;

type Props = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

export default function OtpScreen({ route, navigation }: Props) {
  const { phone } = route.params;

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const otpInputRef = useRef<TextInput>(null);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const progressAnimation = useRef(new Animated.Value(0)).current;

  const maskPhone = (p: string) => p.replace(/(\d{3})$/, '***');

  const phoneNumber = maskPhone(phone);

  /* ---------------- Timer ---------------- */
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
      Animated.timing(progressAnimation, {
        toValue: (30 - timer) / 30,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, progressAnimation]);

  /* ---------------- Shake ---------------- */
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /* ---------------- OTP Change ---------------- */
  const handleChange = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, '').slice(0, OTP_LENGTH);
    setOtp(cleaned);
    setIsError(false);

    if (cleaned.length === OTP_LENGTH) {
      setTimeout(handleVerifyOTP, 100);
    }
  };

  const handleClear = () => {
    setOtp('');
    otpInputRef.current?.focus();
  };

  /* ---------------- Verify OTP ---------------- */
  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setAttempts((prev) => prev + 1);

    try {
      type VerifyResponse = { data?: { token?: string }; token?: string };
      const response = (await verifyOTP(otp)) as VerifyResponse;
      const token = response?.data?.token ?? response?.token;

      if (!token) throw new Error('Invalid token');

      await storeToken(token);

      Alert.alert('Success', 'OTP verified successfully', [
        {
          text: 'Continue',
          onPress: () => navigation.replace('Splash'), // 🔥 CHANGE LATER
        },
      ]);
    } catch {
      setIsError(true);
      triggerShake();

      if (attempts >= 2) {
        Alert.alert('Too Many Attempts', 'Please request a new OTP.');
        setTimer(0);
        setCanResend(true);
      } else {
        Alert.alert('Invalid OTP', 'Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- Resend ---------------- */
  const handleResendOTP = () => {
    setOtp('');
    setTimer(30);
    setCanResend(false);
    setIsError(false);
    setAttempts(0);
    progressAnimation.setValue(0);

    setTimeout(() => otpInputRef.current?.focus(), 100);

    Alert.alert('OTP Resent', 'A new OTP has been sent');
  };

  /* ---------------- Wrong Number ---------------- */
  const handleWrongNumber = () => {
    Alert.alert('Wrong Number?', 'Go back and change your phone number', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Go Back', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Verifying your number</Text>
            <Text style={styles.subtitle}>
              Waiting to automatically detect the 6-digit code sent to{' '}
              <Text style={styles.bold}>{phoneNumber}</Text>&nbsp;
              <TouchableOpacity onPress={handleWrongNumber}>
                <Text style={styles.wrongNumberText}>Wrong number?</Text>
              </TouchableOpacity>
            </Text>
          </View>

          {/* OTP */}
          <Animated.View
            style={[
              styles.otpSection,
              { transform: [{ translateX: shakeAnimation }] },
            ]}
          >
            <View style={styles.otpInputWrapper}>
              <TextInput
                ref={otpInputRef}
                style={[styles.otpInput, isError && styles.otpInputError]}
                value={otp}
                onChangeText={handleChange}
                placeholder="Enter 6-digit OTP"
                keyboardType="number-pad"
                maxLength={OTP_LENGTH}
                autoFocus
                editable={!isLoading}
              />

              {otp.length > 0 && (
                <TouchableOpacity
                  onPress={handleClear}
                  style={styles.clearOtpButton}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={22}
                    color="#999"
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Resend */}
            <View style={styles.resendContainer}>
              {canResend ? (
                <TouchableOpacity onPress={handleResendOTP}>
                  <Text style={styles.resendPrompt}>
                    Didn&apos;t receive code?
                  </Text>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.resendTimerText}>Resend in {timer}s</Text>
              )}
            </View>
          </Animated.View>

          {/* Verify */}
          <TouchableOpacity
            style={[
              styles.verifyButton,
              (isLoading || otp.length < OTP_LENGTH) &&
                styles.verifyButtonDisabled,
            ]}
            onPress={handleVerifyOTP}
            disabled={isLoading || otp.length < OTP_LENGTH}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.verifyText}>Verify</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
