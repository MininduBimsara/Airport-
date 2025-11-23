import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { AIRPORT_CENTER, PLACES } from "../data/places";

const { height } = Dimensions.get("window");

export default function MapPreviewScreen() {
  const router = useRouter();
  const { placeId } = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);
  const markerScale = useSharedValue(0);

  const place = PLACES.find((p) => p.id.toString() === placeId);

  useEffect(() => {
    if (place && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.animateToRegion({
          latitude: place.coordinates.latitude,
          longitude: place.coordinates.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }, 1000);
      }, 500);

      markerScale.value = withDelay(800, withSpring(1, { damping: 10 }));
    }
  }, [place]);

  const markerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: markerScale.value }],
    };
  });

  if (!place) {
    return (
      <SafeAreaView className="flex-1 bg-off-white items-center justify-center">
        <Text className="text-gray-text">Place not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-off-white">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Map */}
      <View className="flex-1 relative">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: AIRPORT_CENTER.latitude,
            longitude: AIRPORT_CENTER.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          mapType="standard"
          userInterfaceStyle="light"
        >
          <Marker
            coordinate={place.coordinates}
            title={place.name}
            description={place.description}
          >
            <Animated.View style={markerAnimatedStyle}>
              <View
                className="items-center justify-center p-3 rounded-full bg-primary shadow-lg border-2 border-white"
              >
                <Ionicons name="location" size={32} color="#ffffff" />
              </View>
            </Animated.View>
          </Marker>
        </MapView>

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full items-center justify-center shadow-card"
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>

        {/* Recenter Button */}
        <TouchableOpacity
          onPress={() => {
            mapRef.current?.animateToRegion({
              latitude: place.coordinates.latitude,
              longitude: place.coordinates.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }, 1000);
          }}
          className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full items-center justify-center shadow-card"
        >
          <Ionicons name="locate" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Info Card */}
      <View className="bg-white pb-8 pt-6 rounded-t-3xl -mt-6 shadow-floating">
        <View className="px-6">
            <View className="items-center mb-4">
                <View className="w-12 h-1 bg-gray-200 rounded-full" />
            </View>
            
            <View className="flex-row items-start mb-6">
                <View className="w-16 h-16 items-center justify-center mr-4 rounded-2xl bg-soft-blue">
                    <Ionicons name="location" size={32} color="#005B8F" />
                </View>
                <View className="flex-1 pt-1">
                    <Text className="text-dark-text text-2xl font-bold mb-1">
                        {place.name}
                    </Text>
                    <View className="flex-row items-center">
                        <Text className="text-primary text-sm font-bold mr-2">
                            {place.type}
                        </Text>
                        <View className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                        <Text className="text-gray-text text-sm">{place.floor}</Text>
                    </View>
                </View>
            </View>

            <Text className="text-dark-text leading-5 mb-6">
                {place.description}
            </Text>

            {/* Stats */}
            <View className="flex-row justify-around py-4 mb-6 rounded-xl bg-off-white border border-gray-100">
                <View className="items-center">
                    <Ionicons name="walk-outline" size={24} color="#005B8F" />
                    <Text className="text-dark-text font-bold mt-1">{place.distance}m</Text>
                    <Text className="text-gray-text text-xs">Distance</Text>
                </View>
                <View className="w-px bg-gray-200" />
                <View className="items-center">
                    <Ionicons name="time-outline" size={24} color="#005B8F" />
                    <Text className="text-dark-text font-bold mt-1">
                        ~{Math.ceil((place.distance || 0) / 60)} min
                    </Text>
                    <Text className="text-gray-text text-xs">Walk Time</Text>
                </View>
            </View>

            {/* Let's Go Button */}
            <TouchableOpacity
                onPress={() => {
                    router.push({
                        pathname: "/route-navigation" as any,
                        params: { placeId: place.id.toString() },
                    });
                }}
                className="w-full bg-primary py-4 rounded-xl items-center shadow-lg"
            >
                <Text className="text-white font-bold text-lg tracking-wide">NAVIGATE</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
