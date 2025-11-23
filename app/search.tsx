import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AIRPORT_CENTER, CATEGORIES, Place, PLACES } from "../data/places";

export default function SearchScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
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

  const getMarkerColor = (type: string): string => {
    switch (type) {
      case "ATM":
        return "#0FA3B1";
      case "Cashier":
        return "#3BA99C";
      case "Help Desk":
        return "#005B8F";
      case "Gate":
        return "#66BCE8";
      case "Lounge":
        return "#3BA99C";
      case "Restroom":
        return "#0FA3B1";
      case "Shop":
        return "#66BCE8";
      case "Restaurant":
        return "#3BA99C";
      case "Medical":
        return "#3BA99C";
      default:
        return "#005B8F";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#005B8F" />

      {/* Header */}
      <View className="px-4 pt-4 pb-3 bg-primary border-b border-sky-blue/20">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white/20 p-2 rounded-full mr-3"
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white">
                Search & Navigate
              </Text>
              <Text className="text-sm text-sky-blue mt-1">
                Find your way around BIA
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-lg">
          <Ionicons name="search-outline" size={20} color="#005B8F" />
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
              key={category.id}
              onPress={() => setSelectedCategory(category.name)}
              className={`mr-2 px-4 py-2 rounded-full border ${
                selectedCategory === category.name
                  ? "bg-primary border-primary"
                  : "bg-white border-soft-grey-blue"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedCategory === category.name
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {category.name}
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
              sortByDistance ? "bg-teal-green/10" : "bg-gray-100"
            }`}
          >
            <Ionicons
              name={sortByDistance ? "checkmark-circle" : "swap-vertical"}
              size={16}
              color={sortByDistance ? "#3BA99C" : "#6b7280"}
            />
            <Text
              className={`text-xs font-semibold ml-1 ${
                sortByDistance ? "text-teal-green" : "text-gray-600"
              }`}
            >
              Sort by Distance
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map View */}
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
        >
          {sortedPlaces.map((place) => (
            <Marker
              key={place.id}
              coordinate={place.coordinates}
              onPress={() => handlePlacePress(place)}
            >
              <View
                className="items-center justify-center p-3 rounded-full shadow-lg"
                style={{ backgroundColor: getMarkerColor(place.type) }}
              >
                <Ionicons name="location" size={24} color="#ffffff" />
              </View>
            </Marker>
          ))}
        </MapView>

        {sortedPlaces.length === 0 && (
          <View className="absolute inset-0 items-center justify-center bg-white/80">
            <Ionicons name="search-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-400 text-lg mt-4">No places found</Text>
            <Text className="text-gray-400 text-sm mt-1">
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
