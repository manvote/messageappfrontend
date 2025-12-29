import React from 'react';
import { View } from 'react-native';

export function OnlineIndicator({ online }: { online: boolean }) {
  return (
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: online ? 'green' : 'gray',
      }}
    />
  );
}