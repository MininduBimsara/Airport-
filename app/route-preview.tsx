import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PLACES, getDirections } from "../data/places";

export default function RoutePreviewScreen() {
  const router = useRouter();
  const { placeId } = useLocalSearchParams();

  // Find the selected place
  const place = PLACES.find((p) => p.id.toString() === placeId);

  if (!place) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Place not found</Text>
      </SafeAreaView>
    );
  }

  const directions = getDirections(place);

  // Get icon based on type
  const getIcon = (type: string): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case "ATM":
        return "cash-outline";
      case "Cashier":
        return "card-outline";
      case "Help Desk":
        return "information-circle-outline";
      case "Gate":
        return "airplane-outline";
      case "Lounge":
        return "bed-outline";
      case "Restroom":
        return "man-outline";
      case "Shop":
        return "cart-outline";
      case "Restaurant":
        return "restaurant-outline";
      case "Medical":
        return "medical-outline";
      default:
        return "location-outline";
    }
  };

  // Get color based on type
  const getTypeColor = (type: string): string => {
    switch (type) {
      case "ATM":
        return "#04a51b";
      case "Cashier":
        return "#ef6c1a";
      case "Help Desk":
        return "#2a658a";
      case "Gate":
        return "#dc141b";
      case "Lounge":
        return "#4d8e7b";
      case "Restroom":
        return "#518494";
      case "Shop":
        return "#ef6c1a";
      case "Restaurant":
        return "#04a51b";
      case "Medical":
        return "#dc141b";
      default:
        return "#2a658a";
    }
  };

  const typeColor = getTypeColor(place.type);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View className="px-4 py-4 bg-white border-b border-gray-100 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 p-2 rounded-full bg-gray-100"
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900">Route Preview</Text>
          <Text className="text-sm text-gray-500">Step-by-step directions</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Destination Card */}
        <View
          className="mx-4 mt-4 bg-white rounded-2xl p-5 border-2 shadow-lg"
          style={{ borderColor: typeColor }}
        >
          <View className="flex-row items-start mb-4">
            <View
              className="w-16 h-16 rounded-2xl items-center justify-center mr-4"
              style={{ backgroundColor: `${typeColor}15` }}
            >
              <Ionicons
                name={getIcon(place.type)}
                size={32}
                color={typeColor}
              />
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                {place.name}
              </Text>
              <View
                className="px-3 py-1 rounded-lg self-start"
                style={{ backgroundColor: `${typeColor}20` }}
              >
                <Text
                  className="text-sm font-bold"
                  style={{ color: typeColor }}
                >
                  {place.type}
                </Text>
              </View>
            </View>
          </View>

          {/* Info Grid */}
          <View className="flex-row justify-between pt-4 border-t border-gray-100">
            <View className="items-center flex-1">
              <View className="flex-row items-center mb-1">
                <Ionicons name="layers-outline" size={18} color="#6b7280" />
                <Text className="text-xs text-gray-500 ml-1">Floor</Text>
              </View>
              <Text className="text-sm font-bold text-gray-900">
                {place.floor}
              </Text>
            </View>
            <View className="w-px bg-gray-200" />
            <View className="items-center flex-1">
              <View className="flex-row items-center mb-1">
                <Ionicons name="walk-outline" size={18} color="#6b7280" />
                <Text className="text-xs text-gray-500 ml-1">Distance</Text>
              </View>
              <Text className="text-sm font-bold text-gray-900">
                {place.distance}m
              </Text>
            </View>
            <View className="w-px bg-gray-200" />
            <View className="items-center flex-1">
              <View className="flex-row items-center mb-1">
                <Ionicons name="time-outline" size={18} color="#6b7280" />
                <Text className="text-xs text-gray-500 ml-1">Time</Text>
              </View>
              <Text className="text-sm font-bold text-gray-900">
                ~{Math.ceil((place.distance || 0) / 60)} min
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View className="mx-4 mt-4 bg-gray-50 rounded-2xl p-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={20} color="#6b7280" />
            <Text className="text-sm font-bold text-gray-700 ml-2">
              About this location
            </Text>
          </View>
          <Text className="text-gray-600 leading-5">{place.description}</Text>
        </View>

        {/* Step-by-Step Directions */}
        <View className="mx-4 mt-4 mb-4">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Step-by-Step Directions
          </Text>

          {directions.map((direction, index) => (
            <View key={index} className="flex-row mb-4">
              {/* Step Number */}
              <View className="items-center mr-3">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{
                    backgroundColor:
                      index === directions.length - 1
                        ? typeColor
                        : `${typeColor}20`,
                  }}
                >
                  {index === directions.length - 1 ? (
                    <Ionicons name="flag" size={18} color="#ffffff" />
                  ) : (
                    <Text
                      className="font-bold"
                      style={{
                        color:
                          index === directions.length - 1
                            ? "#ffffff"
                            : typeColor,
                      }}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                {index < directions.length - 1 && (
                  <View
                    className="w-0.5 flex-1 mt-1"
                    style={{ backgroundColor: `${typeColor}30`, height: 30 }}
                  />
                )}
              </View>

              {/* Direction Text */}
              <View className="flex-1 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <Text className="text-gray-800 leading-5">{direction}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Start Navigation Button */}
      <View className="px-4 py-4 bg-white border-t border-gray-100">
        <TouchableOpacity
          className="rounded-2xl py-4 items-center shadow-lg"
          style={{ backgroundColor: typeColor }}
          onPress={() => {
            // In a real app, this would start AR navigation
            router.back();
          }}
        >
          <View className="flex-row items-center">
            <Ionicons name="navigate" size={24} color="#ffffff" />
            <Text className="text-white text-lg font-bold ml-2">
              Start Navigation
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
