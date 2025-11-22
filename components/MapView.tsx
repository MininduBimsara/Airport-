import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import LocationMarker from './LocationMarker';

interface MapViewProps {
  locations: any[];
  onMarkerPress: (location: any) => void;
}

export default function MapView({ locations, onMarkerPress }: MapViewProps) {
  const { width, height } = Dimensions.get('window');

  return (
    <View className="flex-1 bg-surface relative overflow-hidden rounded-3xl border border-white/10 m-4 shadow-2xl">
      {/* Placeholder for Map Background (e.g., Terminal Layout) */}
      <View className="absolute inset-0 items-center justify-center opacity-10">
        <Text className="text-white text-9xl font-bold tracking-widest">BIA</Text>
        <View className="absolute w-[500px] h-[500px] border-4 border-white/20 rounded-full" />
        <View className="absolute w-[300px] h-[300px] border-4 border-white/20 rounded-full" />
      </View>

      {/* Markers */}
      {locations.map((loc) => (
        <LocationMarker
          key={loc.id}
          x={loc.x}
          y={loc.y}
          name={loc.name}
          type={loc.type}
          onPress={() => onMarkerPress(loc)}
        />
      ))}
    </View>
  );
}
