import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import colors from '../../theme/colors';
import logo from '../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // replace so user can't go back to splash
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>MANOVATE WEB</Text>

      <View style={styles.footer}>
        <Text style={styles.from}>from</Text>
        <Text style={styles.meta}>
          <Icon name="meta" size={22} color="#005DD6" />
          Meta
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 226,
    height: 226,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  from: {
    fontSize: 14,
    color: colors.primary,
  },
  meta: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
});
