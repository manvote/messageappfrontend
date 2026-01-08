import EncryptedStorage from 'react-native-encrypted-storage';

const TOKEN_KEY = 'auth_token';

export const storeToken = async (token: string): Promise<void> => {
  try {
    await EncryptedStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await EncryptedStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error fetching token', error);
    return null;
  }
};

export const clearToken = async (): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing token', error);
  }
};
