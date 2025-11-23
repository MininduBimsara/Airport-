import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { BottomNavbar } from "../components/BottomNavbar";
import { NeumorphicButton } from "../components/NeumorphicButton";
import { NeumorphicView } from "../components/NeumorphicView";
import { CATEGORIES, PLACES } from "../data/places";

const { width } = Dimensions.get('window');

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
    <SafeAreaView className="flex-1 bg-neu-bg">
      <StatusBar barStyle="dark-content" backgroundColor="#E0E5EC" />

      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-neu-dark-gray text-2xl font-bold">
              Dashboard
            </Text>
            <Text className="text-neu-gray text-sm">
              Find your way
            </Text>
          </View>
          <NeumorphicButton 
            onPress={() => {}} 
            className="w-12 h-12"
            style={{ borderRadius: 24 }}
          >
            <Ionicons name="person" size={20} color="#4A4A4A" />
          </NeumorphicButton>
        </View>

        {/* Search Bar - Inset Style Simulation */}
        <View className="relative">
            <View 
                className="bg-neu-bg rounded-2xl h-14 justify-center"
                style={{
                    // Inset Shadow Simulation
                    borderColor: 'rgba(255,255,255,0.5)',
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    shadowColor: '#A3B1C6',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 0, // Disable elevation for inset feel
                }}
            >
                <View className="flex-row items-center px-4">
                    <Ionicons name="search" size={20} color="#9E9E9E" />
                    <TextInput
                        className="flex-1 ml-3 text-base text-neu-dark-gray"
                        placeholder="Search..."
                        placeholderTextColor="#9E9E9E"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <Ionicons name="close-circle" size={20} color="#9E9E9E" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {/* Inner Top Shadow for Inset Feel */}
            <View 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    zIndex: -1
                }}
            />
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Search Results */}
        {searchQuery.length > 0 ? (
          <View className="mb-4">
            <Text className="text-neu-dark-gray text-lg font-bold mb-4">
              {filteredPlaces.length} {filteredPlaces.length === 1 ? "result" : "results"} found
            </Text>
            {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => (
                <TouchableOpacity
                    key={place.id}
                    onPress={() => handlePlaceSelect(place.id)}
                    activeOpacity={0.8}
                    className="mb-4"
                >
                    <NeumorphicView className="p-4 flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-neu-bg items-center justify-center mr-4" style={{ borderWidth: 1, borderColor: '#fff' }}>
                        <Ionicons name="location" size={20} color="#4A4A4A" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-neu-dark-gray font-bold text-lg">
                        {place.name}
                        </Text>
                        <Text className="text-neu-gray text-sm">{place.type} • {place.floor}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />
                    </NeumorphicView>
                </TouchableOpacity>
                ))
            ) : (
                <View className="items-center justify-center py-12">
                    <Ionicons name="search-outline" size={48} color="#9E9E9E" />
                    <Text className="text-neu-gray text-lg mt-4">No results found</Text>
                </View>
            )}
          </View>
        ) : (
          <>
            {/* Categories */}
            <Text className="text-neu-dark-gray text-lg font-bold mb-4">
              Categories
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {CATEGORIES.filter(cat => cat.id !== "all").map((category) => (
                <TouchableOpacity 
                    key={category.id} 
                    className="w-[48%] mb-4"
                    onPress={() => handleCategoryPress(category.name)}
                >
                    <NeumorphicView className="items-center justify-center py-6">
                        <Ionicons name={category.icon as any} size={32} color="#4A4A4A" />
                        <Text className="text-neu-dark-gray font-medium mt-3">
                            {category.name}
                        </Text>
                    </NeumorphicView>
                </TouchableOpacity>
              ))}
            </View>

            {/* Popular Places */}
            <Text className="text-neu-dark-gray text-lg font-bold mb-4 mt-2">
              Popular Places
            </Text>
            {PLACES.slice(0, 5).map((place) => (
              <TouchableOpacity
                key={place.id}
                onPress={() => handlePlaceSelect(place.id)}
                activeOpacity={0.8}
                className="mb-4"
              >
                <NeumorphicView className="p-4 flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-neu-bg items-center justify-center mr-4" style={{ borderWidth: 1, borderColor: '#fff' }}>
                    <Ionicons name="star" size={18} color="#4A4A4A" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neu-dark-gray font-bold">{place.name}</Text>
                    <Text className="text-neu-gray text-sm">{place.floor}</Text>
                  </View>
                  <Text className="text-neu-gray text-xs">{place.distance}m</Text>
                </NeumorphicView>
              </TouchableOpacity>
            ))}
            {/* Spacer for Bottom Navbar */}
            <View className="h-24" />
          </>
        )}
      </ScrollView>
      
      {/* Bottom Navbar */}
      <BottomNavbar />
    </SafeAreaView>
  );
}
