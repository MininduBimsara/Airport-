import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import CategoryCard from "../components/CategoryCard";
import { CATEGORIES, PLACES } from "../data/places";

export default function NavigationHomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryPress = (categoryName: string) => {
    setSearchQuery(categoryName);
  };

  const filteredPlaces = PLACES.filter((place) => {
    if (!searchQuery) return false;
    return (
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handlePlaceSelect = (placeId: number) => {
    router.push({
      pathname: "/map-preview" as any,
      params: { placeId: placeId.toString() },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-sky-light">
      <StatusBar barStyle="dark-content" backgroundColor="#E0F4FF" />

      {/* Gradient Background */}
      <LinearGradient
        colors={["#E0F4FF", "#87CEEB", "#4A90B8"]}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Header */}
      <View className="px-4 pt-4 pb-3">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/80 p-3 rounded-full mr-3 shadow-md"
          >
            <Ionicons name="arrow-back" size={24} color="#2a658a" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-primary text-2xl font-bold">
              Where do you want to go?
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="bg-white rounded-3xl px-5 py-4 shadow-xl flex-row items-center">
          <Ionicons name="search" size={24} color="#2a658a" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-800"
            placeholder="Search ATM, Gates, Lounges..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={24} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView className="flex-1 px-2">
        {/* Search Results */}
        {searchQuery.length > 0 && filteredPlaces.length > 0 ? (
          <View className="px-2 mb-4">
            <Text className="text-white text-lg font-bold mb-3 px-2">
              {filteredPlaces.length} {filteredPlaces.length === 1 ? "result" : "results"} found
            </Text>
            {filteredPlaces.map((place) => (
              <TouchableOpacity
                key={place.id}
                onPress={() => handlePlaceSelect(place.id)}
                className="bg-white/90 rounded-2xl p-4 mb-3 shadow-lg"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center">
                  <View className="bg-primary/10 p-3 rounded-xl mr-3">
                    <Ionicons name="location" size={24} color="#2a658a" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-bold text-lg">
                      {place.name}
                    </Text>
                    <Text className="text-gray-600 text-sm">{place.type} • {place.floor}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#2a658a" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : searchQuery.length > 0 ? (
          <View className="items-center justify-center py-12">
            <Ionicons name="search-outline" size={64} color="#ffffff" />
            <Text className="text-white text-lg mt-4">No results found</Text>
          </View>
        ) : (
          <>
            {/* Category Grid */}
            <Text className="text-white text-xl font-bold mb-4 px-2">
              Quick Access
            </Text>
            <View className="flex-row flex-wrap">
              {CATEGORIES.filter(cat => cat.id !== "all").map((category) => (
                <View key={category.id} className="w-1/2">
                  <CategoryCard
                    icon={category.icon}
                    title={category.name}
                    color={category.color}
                    onPress={() => handleCategoryPress(category.name)}
                  />
                </View>
              ))}
            </View>

            {/* Popular Destinations */}
            <View className="mt-6 px-2 pb-6">
              <Text className="text-white text-xl font-bold mb-4">
                Popular Destinations
              </Text>
              {PLACES.slice(0, 5).map((place) => (
                <TouchableOpacity
                  key={place.id}
                  onPress={() => handlePlaceSelect(place.id)}
                  className="bg-white/80 rounded-2xl p-4 mb-3 shadow-md flex-row items-center"
                  activeOpacity={0.8}
                >
                  <View className="bg-secondary/20 p-3 rounded-xl mr-3">
                    <Ionicons name="star" size={20} color="#518494" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-bold">{place.name}</Text>
                    <Text className="text-gray-600 text-sm">{place.floor}</Text>
                  </View>
                  <Text className="text-gray-500 text-sm">{place.distance}m</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
