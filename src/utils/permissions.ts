import { Platform, Linking, Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const CAMERA_PERMISSION = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
const MICROPHONE_PERMISSION = Platform.OS === 'android' ? PERMISSIONS.ANDROID.RECORD_AUDIO : PERMISSIONS.IOS.MICROPHONE;

export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    // Use VisionCamera API if available
    if (typeof (Camera as any).requestCameraPermission === 'function') {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'denied') {
        Alert.alert(
          'Camera Permission',
          'Camera access is required to take photos. Please enable it in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }
      return permission === 'granted';
    }

    // Fallback to react-native-permissions
    const result = await request(CAMERA_PERMISSION);
    if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      Alert.alert(
        'Camera Permission',
        'Camera access is required to take photos. Please enable it in settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
};

export const requestMicrophonePermission = async (): Promise<boolean> => {
  try {
    if (typeof (Camera as any).requestMicrophonePermission === 'function') {
      const permission = await Camera.requestMicrophonePermission();
      if (permission === 'denied') {
        Alert.alert(
          'Microphone Permission',
          'Microphone access is required for video recording.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }
      return permission === 'granted';
    }

    const result = await request(MICROPHONE_PERMISSION);
    if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      Alert.alert(
        'Microphone Permission',
        'Microphone access is required for video recording.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
    return false;
  }
};

export const checkCameraPermissions = async (): Promise<{
  camera: boolean;
  microphone: boolean;
}> => {
  try {
    if (typeof (Camera as any).getCameraPermissionStatus === 'function') {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      return {
        camera: cameraPermission === 'granted',
        microphone: microphonePermission === 'granted',
      };
    }

    const cameraStatus = await check(CAMERA_PERMISSION);
    const micStatus = await check(MICROPHONE_PERMISSION);
    return {
      camera: cameraStatus === RESULTS.GRANTED,
      microphone: micStatus === RESULTS.GRANTED,
    };
  } catch (error) {
    console.error('Error checking permissions:', error);
    return { camera: false, microphone: false };
  }
};