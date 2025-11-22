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
      // Animate to marker location
      setTimeout(() => {
        mapRef.current?.animateToRegion({
          latitude: place.coordinates.latitude,
          longitude: place.coordinates.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }, 1000);
      }, 500);

      // Animate marker drop
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
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Place not found</Text>
      </SafeAreaView>
    );
  }

  const getTypeColor = (type: string): string => {
    switch (type) {
      case "ATM":
        return "#518494";
      case "Cashier":
        return "#4d8e7b";
      case "Help Desk":
        return "#2a658a";
      case "Gate":
        return "#518494";
      case "Lounge":
        return "#4d8e7b";
      case "Restroom":
        return "#2a658a";
      case "Shop":
        return "#518494";
      case "Restaurant":
        return "#4d8e7b";
      case "Medical":
        return "#04a51b";
      default:
        return "#2a658a";
    }
  };

  const typeColor = getTypeColor(place.type);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Map */}
      <View className="flex-1">
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
        >
          <Marker
            coordinate={place.coordinates}
            title={place.name}
            description={place.description}
          >
            <Animated.View style={markerAnimatedStyle}>
              <View
                className="items-center justify-center p-3 rounded-full shadow-lg"
                style={{ backgroundColor: typeColor }}
              >
                <Ionicons name="location" size={32} color="#ffffff" />
              </View>
            </Animated.View>
          </Marker>
        </MapView>

        {/* Back Button */}
        <View className="absolute top-4 left-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white p-3 rounded-full shadow-xl"
          >
            <Ionicons name="arrow-back" size={24} color="#2a658a" />
          </TouchableOpacity>
        </View>

        {/* Recenter Button */}
        <View className="absolute top-4 right-4">
          <TouchableOpacity
            onPress={() => {
              mapRef.current?.animateToRegion({
                latitude: place.coordinates.latitude,
                longitude: place.coordinates.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }, 1000);
            }}
            className="bg-white p-3 rounded-full shadow-xl"
          >
            <Ionicons name="locate" size={24} color="#2a658a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Card */}
      <View className="bg-white border-t-4 shadow-2xl" style={{ borderTopColor: typeColor }}>
        <View className="p-5">
          <View className="flex-row items-start mb-4">
            <View
              className="p-4 rounded-2xl mr-4"
              style={{ backgroundColor: `${typeColor}20` }}
            >
              <Ionicons name="location" size={32} color={typeColor} />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 text-2xl font-bold mb-1">
                {place.name}
              </Text>
              <View className="flex-row items-center mb-2">
                <View
                  className="px-3 py-1 rounded-lg mr-2"
                  style={{ backgroundColor: `${typeColor}30` }}
                >
                  <Text className="text-sm font-bold" style={{ color: typeColor }}>
                    {place.type}
                  </Text>
                </View>
                <Ionicons name="layers-outline" size={16} color="#6b7280" />
                <Text className="text-gray-600 text-sm ml-1">{place.floor}</Text>
              </View>
              <Text className="text-gray-600 leading-5">
                {place.description}
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around py-3 bg-sky-light rounded-xl mb-4">
            <View className="items-center">
              <Ionicons name="walk-outline" size={20} color="#2a658a" />
              <Text className="text-primary font-bold mt-1">{place.distance}m</Text>
              <Text className="text-gray-500 text-xs">Distance</Text>
            </View>
            <View className="w-px bg-gray-300" />
            <View className="items-center">
              <Ionicons name="time-outline" size={20} color="#2a658a" />
              <Text className="text-primary font-bold mt-1">
                ~{Math.ceil((place.distance || 0) / 60)} min
              </Text>
              <Text className="text-gray-500 text-xs">Walk Time</Text>
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
            className="rounded-2xl py-4 items-center shadow-lg"
            style={{ backgroundColor: typeColor }}
          >
            <View className="flex-row items-center">
              <Ionicons name="navigate" size={24} color="#ffffff" />
              <Text className="text-white text-lg font-bold ml-2">
                Let's Go
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
