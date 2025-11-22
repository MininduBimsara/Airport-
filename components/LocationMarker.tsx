import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface LocationMarkerProps {
  x: number;
  y: number;
  name: string;
  type: string;
  onPress: () => void;
}

export default function LocationMarker({ x, y, name, type, onPress }: LocationMarkerProps) {
  return (
    <TouchableOpacity
      className="absolute items-center justify-center"
      style={{ left: x, top: y }}
      onPress={onPress}
    >
      <View className="w-8 h-8 bg-primary rounded-full border-2 border-white items-center justify-center shadow-lg shadow-primary">
        <View className="w-2 h-2 bg-white rounded-full" />
      </View>
      <View className="mt-1 bg-black/80 px-2 py-1 rounded-md">
        <Text className="text-white text-xs font-bold">{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
