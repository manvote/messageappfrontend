import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import type { CameraControlsProps } from '../types/camera.types';

const { width } = Dimensions.get('window');

export const CameraControls: React.FC<CameraControlsProps> = ({
  onCapture,
  onFlipCamera,
  onToggleFlash,
  flashMode,
}) => {
  const getFlashIcon = () => {
    switch (flashMode) {
      case 'on':
        return '⚡';
      case 'auto':
        return '⚡A';
      default:
        return '⚡OFF';
    }
  };

  return (
    <View style={styles.container}>
      {/* Flash Button */}
      <TouchableOpacity style={styles.controlButton} onPress={onToggleFlash}>
        <Text style={styles.iconText}>{getFlashIcon()}</Text>
      </TouchableOpacity>

      {/* Capture Button */}
      <TouchableOpacity style={styles.captureButton} onPress={onCapture}>
        <View style={styles.captureButtonInner} />
      </TouchableOpacity>

      {/* Flip Camera Button */}
      <TouchableOpacity style={styles.controlButton} onPress={onFlipCamera}>
        <Text style={styles.iconText}>🔄</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
    color: '#fff',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
  },
});