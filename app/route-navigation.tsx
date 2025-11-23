import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AIRPORT_CENTER,
  getDirections,
  getRoutePolyline,
  PLACES,
} from "../data/places";

export default function RouteNavigationScreen() {
  const router = useRouter();
  const { placeId } = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);

  const place = PLACES.find((p) => p.id.toString() === placeId);

  useEffect(() => {
    if (place && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.fitToCoordinates(
          [
            {
              latitude: AIRPORT_CENTER.latitude,
              longitude: AIRPORT_CENTER.longitude,
            },
            place.coordinates,
          ],
          {
            edgePadding: { top: 100, right: 50, bottom: 350, left: 50 },
            animated: true,
          }
        );
      }, 500);
    }
  }, [place]);

  if (!place) {
    return (
      <SafeAreaView className="flex-1 bg-off-white items-center justify-center">
        <Text className="text-gray-text">Place not found</Text>
      </SafeAreaView>
    );
  }

  const routePolyline = getRoutePolyline(place);
  const directions = getDirections(place);

  return (
    <SafeAreaView className="flex-1 bg-off-white">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

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
          <Polyline
            coordinates={routePolyline}
            strokeColor="#005B8F"
            strokeWidth={5}
            lineDashPattern={[1]}
          />

          <Marker coordinate={AIRPORT_CENTER} title="Your Location">
            <View className="bg-secondary p-3 rounded-full shadow-lg border-2 border-white">
              <Ionicons name="person" size={20} color="#ffffff" />
            </View>
          </Marker>

          <Marker coordinate={place.coordinates} title={place.name}>
            <View className="p-3 rounded-full shadow-lg bg-primary border-2 border-white">
              <Ionicons name="flag" size={20} color="#ffffff" />
            </View>
          </Marker>
        </MapView>

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full items-center justify-center shadow-card"
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>

        {/* Distance Badge */}
        <View className="absolute top-4 right-4 bg-white px-4 py-3 rounded-2xl flex-row items-center shadow-card">
          <Ionicons name="navigate" size={20} color="#005B8F" />
          <View className="ml-2">
            <Text className="text-dark-text font-bold">{place.distance}m</Text>
            <Text className="text-gray-text text-xs">
              ~{Math.ceil((place.distance || 0) / 60)} min
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation Steps */}
      <View className="bg-white border-t border-gray-100 shadow-floating rounded-t-3xl -mt-6 pt-6 h-1/2">
        <View className="px-6 flex-1">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center flex-1">
              <View className="p-3 rounded-xl mr-4 bg-soft-blue">
                <Ionicons name="map" size={24} color="#005B8F" />
              </View>
              <View className="flex-1">
                <Text className="text-dark-text text-lg font-bold">
                  Navigating to {place.name}
                </Text>
                <Text className="text-gray-text text-sm">{place.floor}</Text>
              </View>
            </View>
          </View>

          <ScrollView className="flex-1 mb-4">
            <Text className="text-gray-text font-bold mb-3 uppercase tracking-wider text-xs">
              Directions
            </Text>
            {directions.map((direction, index) => (
              <View key={index} className="flex-row mb-4">
                <View className="items-center mr-4">
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center border border-gray-200 ${
                      index === 0 ? "bg-primary" : "bg-white"
                    }`}
                  >
                    {index === 0 ? (
                      <Ionicons
                        name="radio-button-on"
                        size={16}
                        color="#ffffff"
                      />
                    ) : index === directions.length - 1 ? (
                      <Ionicons name="flag" size={16} color="#005B8F" />
                    ) : (
                      <Text className="font-bold text-xs text-dark-text">
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  {index < directions.length - 1 && (
                    <View className="w-0.5 flex-1 mt-1 bg-gray-200" />
                  )}
                </View>
                <Text className="flex-1 text-dark-text leading-5 pt-1 font-medium">
                  {direction}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View className="flex-row mb-6 space-x-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-1 bg-off-white py-3 rounded-xl items-center border border-gray-200"
            >
              <Text className="text-dark-text font-bold">End Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-primary py-3 rounded-xl items-center flex-row justify-center">
              <Ionicons name="volume-high" size={20} color="#FFF" />
              <Text className="text-white font-bold ml-2">Voice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
