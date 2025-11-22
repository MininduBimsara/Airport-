import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import PlaceCard from "../components/PlaceCard";
import { CATEGORIES, Place, PLACES } from "../data/places";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortByDistance, setSortByDistance] = useState(false);

  // Filter places based on search and category
  const filteredPlaces = PLACES.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || place.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort by distance if enabled
  const sortedPlaces = sortByDistance
    ? [...filteredPlaces].sort((a, b) => (a.distance || 0) - (b.distance || 0))
    : filteredPlaces;

  const handlePlacePress = (place: Place) => {
    router.push({
      pathname: "/route-preview" as any,
      params: { placeId: place.id.toString() },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View className="px-4 pt-4 pb-3 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-3xl font-bold text-gray-900">
              Search & Navigate
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Find your way around BIA
            </Text>
          </View>
          <View className="bg-primary/10 p-3 rounded-full">
            <Ionicons name="navigate-circle" size={28} color="#dc141b" />
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
          <Ionicons name="search-outline" size={20} color="#6b7280" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-900"
            placeholder="Search ATM, cashier, restroom..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <View className="bg-white border-b border-gray-100 pb-3">
        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 pt-3"
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`mr-2 px-4 py-2 rounded-full border ${
                selectedCategory === category
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sort Toggle */}
        <View className="px-4 pt-3 flex-row items-center justify-between">
          <Text className="text-sm text-gray-600">
            {sortedPlaces.length} {sortedPlaces.length === 1 ? "place" : "places"} found
          </Text>
          <TouchableOpacity
            onPress={() => setSortByDistance(!sortByDistance)}
            className={`flex-row items-center px-3 py-1.5 rounded-lg ${
              sortByDistance ? "bg-secondary/10" : "bg-gray-100"
            }`}
          >
            <Ionicons
              name={sortByDistance ? "checkmark-circle" : "swap-vertical"}
              size={16}
              color={sortByDistance ? "#04a51b" : "#6b7280"}
            />
            <Text
              className={`text-xs font-semibold ml-1 ${
                sortByDistance ? "text-secondary" : "text-gray-600"
              }`}
            >
              Sort by Distance
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Results List */}
      <FlatList
        data={sortedPlaces}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <PlaceCard place={item} onPress={() => handlePlacePress(item)} />
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Ionicons name="search-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-400 text-lg mt-4">No places found</Text>
            <Text className="text-gray-400 text-sm mt-1">
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
