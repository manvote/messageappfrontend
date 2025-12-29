import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useCamera } from '../hooks/useCamera';

export const CameraScreen: React.FC = () => {
  console.log('CameraScreen: render');

  const {
    cameraRef,
    cameraType,
    hasPermission,
    isReady,
    takePhoto,
    flipCamera,
    onCameraReady,
  } = useCamera();

  const device = useCameraDevice(cameraType);

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Camera permission required</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        onInitialized={onCameraReady}
      />

      {isReady && (
        <View style={styles.controls}>
          <TouchableOpacity onPress={flipCamera}>
            <Text style={styles.btn}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={takePhoto}>
            <Text style={styles.btn}>Capture</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    color: '#fff',
    fontSize: 18,
  },
});
