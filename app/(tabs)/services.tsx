import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { CATEGORIES, PLACES } from "../../data/places";

const { width } = Dimensions.get("window");

export default function ServicesScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPlaces =
    activeCategory === "all"
      ? PLACES
      : PLACES.filter((place) => place.type === activeCategory);

  return (
    <SafeAreaView className="flex-1 bg-off-white">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View className="px-6 pt-6 pb-4 bg-white shadow-sm z-10">
        <Text className="text-primary text-3xl font-bold">Explore</Text>
        <Text className="text-gray-text text-base">
          Discover airport services & amenities
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Categories Horizontal Scroll */}
        <View className="py-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setActiveCategory(category.name === "All" ? "all" : category.name)}
                className={`mr-4 px-6 py-3 rounded-full border ${
                  (activeCategory === "all" && category.name === "All") || activeCategory === category.name
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-200"
                }`}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name={category.icon as any}
                    size={20}
                    color={(activeCategory === "all" && category.name === "All") || activeCategory === category.name ? "#FFF" : "#6C757D"}
                  />
                  <Text
                    className={`ml-2 font-semibold ${
                        (activeCategory === "all" && category.name === "All") || activeCategory === category.name
                        ? "text-white"
                        : "text-gray-text"
                    }`}
                  >
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Places Grid */}
        <View className="px-6 pb-24">
          <Text className="text-dark-text text-xl font-bold mb-4">
            {activeCategory === "all" ? "All Places" : activeCategory}
          </Text>
          
          {filteredPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              onPress={() =>
                router.push({
                  pathname: "/map-preview" as any,
                  params: { placeId: place.id.toString() },
                })
              }
              activeOpacity={0.9}
              className="bg-white rounded-2xl p-4 mb-4 shadow-card flex-row items-center"
            >
              <View className="w-16 h-16 rounded-xl bg-soft-blue items-center justify-center mr-4">
                <Ionicons name="location" size={32} color="#005B8F" />
              </View>
              <View className="flex-1">
                <Text className="text-dark-text text-lg font-bold">
                  {place.name}
                </Text>
                <Text className="text-gray-text text-sm mb-1">
                  {place.type} • {place.floor}
                </Text>
                <View className="flex-row items-center">
                    <Ionicons name="walk-outline" size={14} color="#0FA3B1" />
                    <Text className="text-secondary text-xs font-bold ml-1">{place.distance}m</Text>
                </View>
              </View>
              <View className="w-10 h-10 rounded-full bg-off-white items-center justify-center">
                <Ionicons name="chevron-forward" size={20} color="#6C757D" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
