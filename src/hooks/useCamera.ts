import { useState, useRef, useEffect } from 'react';
import {
  Camera,
  type CameraPosition, type PhotoFile,
} from 'react-native-vision-camera';
import { requestCameraPermission } from '../utils/permissions';


export const useCamera = () => {
  const cameraRef = useRef<Camera>(null);

  const [cameraType, setCameraType] = useState<CameraPosition>('back');
  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
  const [hasPermission, setHasPermission] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<PhotoFile | null>(null);

  // 🔐 Camera permission (OFFICIAL WAY)
  useEffect(() => {
    (async () => {
      console.log('useCamera: requesting camera permission');
      const hasPermission = await requestCameraPermission();
      console.log('useCamera: permission result', hasPermission);
      setHasPermission(hasPermission);
    })();
  }, []);

  const onCameraReady = () => {
    console.log('useCamera: onCameraReady');
    setIsReady(true);
  };

  const takePhoto = async (): Promise<PhotoFile | null> => {
    try {
      if (!cameraRef.current) {
        console.warn('Camera ref not ready');
        return null;
      }

      const photo = await cameraRef.current.takePhoto({
        flash: flashMode,
      });

      console.log('useCamera: takePhoto success', photo?.path ?? photo);
      setCapturedPhoto(photo);
      return photo;
    } catch (error) {
      console.error('Take photo error:', error);
      return null;
    }
  };

  const flipCamera = () => {
    setCameraType(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashMode(prev => (prev === 'off' ? 'on' : 'off'));
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  return {
    cameraRef,
    cameraType,
    flashMode,
    hasPermission,
    isReady,
    capturedPhoto,
    flipCamera,
    toggleFlash,
    takePhoto,
    retakePhoto,
    onCameraReady,
  };
};
