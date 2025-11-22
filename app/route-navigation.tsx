import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { AIRPORT_CENTER, getDirections, getRoutePolyline, PLACES } from "../data/places";

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
            { latitude: AIRPORT_CENTER.latitude, longitude: AIRPORT_CENTER.longitude },
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
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Place not found</Text>
      </SafeAreaView>
    );
  }

  const routePolyline = getRoutePolyline(place);
  const directions = getDirections(place);

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
          <Polyline
            coordinates={routePolyline}
            strokeColor={typeColor}
            strokeWidth={4}
            lineDashPattern={[1]}
          />

          <Marker
            coordinate={AIRPORT_CENTER}
            title="Your Location"
          >
            <View className="bg-success p-3 rounded-full shadow-lg">
              <Ionicons name="person" size={24} color="#ffffff" />
            </View>
          </Marker>

          <Marker
            coordinate={place.coordinates}
            title={place.name}
          >
            <View
              className="p-3 rounded-full shadow-lg"
              style={{ backgroundColor: typeColor }}
            >
              <Ionicons name="flag" size={24} color="#ffffff" />
            </View>
          </Marker>
        </MapView>

        <View className="absolute top-4 left-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white p-3 rounded-full shadow-xl"
          >
            <Ionicons name="arrow-back" size={24} color="#2a658a" />
          </TouchableOpacity>
        </View>

        <View className="absolute top-4 right-4 bg-white rounded-2xl px-4 py-3 shadow-xl">
          <View className="flex-row items-center">
            <Ionicons name="navigate" size={20} color={typeColor} />
            <Text className="text-gray-900 font-bold ml-2">{place.distance}m</Text>
          </View>
          <Text className="text-gray-500 text-xs">
            ~{Math.ceil((place.distance || 0) / 60)} min walk
          </Text>
        </View>
      </View>

      <View className="bg-white border-t-4 shadow-2xl" style={{ borderTopColor: typeColor }}>
        <View className="p-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center flex-1">
              <View
                className="p-2 rounded-lg mr-3"
                style={{ backgroundColor: `${typeColor}20` }}
              >
                <Ionicons name="map" size={24} color={typeColor} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 text-lg font-bold">
                  Navigating to {place.name}
                </Text>
                <Text className="text-gray-600 text-sm">{place.floor}</Text>
              </View>
            </View>
          </View>

          <ScrollView className="max-h-48">
            <Text className="text-gray-700 font-bold mb-3">Directions:</Text>
            {directions.map((direction, index) => (
              <View key={index} className="flex-row mb-3">
                <View className="items-center mr-3">
                  <View
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{
                      backgroundColor:
                        index === 0
                          ? "#04a51b"
                          : index === directions.length - 1
                          ? typeColor
                          : `${typeColor}30`,
                    }}
                  >
                    {index === 0 ? (
                      <Ionicons name="radio-button-on" size={16} color="#ffffff" />
                    ) : index === directions.length - 1 ? (
                      <Ionicons name="flag" size={16} color="#ffffff" />
                    ) : (
                      <Text
                        className="font-bold text-xs"
                        style={{ color: typeColor }}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  {index < directions.length - 1 && (
                    <View
                      className="w-0.5 flex-1 mt-1"
                      style={{ backgroundColor: `${typeColor}30`, height: 20 }}
                    />
                  )}
                </View>
                <Text className="flex-1 text-gray-700 leading-5 pt-1">
                  {direction}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View className="flex-row mt-4 space-x-3">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-1 bg-gray-100 rounded-xl py-3 items-center"
            >
              <Text className="text-gray-700 font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 rounded-xl py-3 items-center"
              style={{ backgroundColor: typeColor }}
            >
              <View className="flex-row items-center">
                <Ionicons name="volume-high" size={20} color="#ffffff" />
                <Text className="text-white font-bold ml-2">Voice Guide</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
