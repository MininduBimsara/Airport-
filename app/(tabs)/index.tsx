import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View className="flex-1 bg-off-white">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Hero Section */}
      <View className="h-[45%] relative">
        <LinearGradient
            colors={['#005B8F', '#003355']}
            className="absolute inset-0"
        />
        {/* Placeholder for Real Image - User can replace this View with an ImageBackground */}
        <View className="absolute inset-0 opacity-30 bg-black" />
        
        <SafeAreaView className="flex-1 px-6 pt-12 justify-between pb-12">
            <View>
                <View className="flex-row justify-between items-center mb-8">
                    <View>
                        <Text className="text-white/80 text-lg font-medium">Welcome back,</Text>
                        <Text className="text-white text-3xl font-bold">Traveler</Text>
                    </View>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/30">
                        <Ionicons name="notifications-outline" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <Text className="text-white text-4xl font-bold leading-tight mb-2">
                    Where to next?
                </Text>
            </View>

            {/* Search Bar */}
            <View className="bg-white rounded-2xl flex-row items-center px-4 h-14 shadow-lg">
                <Ionicons name="search" size={24} color="#005B8F" />
                <TextInput 
                    className="flex-1 ml-3 text-lg text-dark-text"
                    placeholder="Find gates, food, shops..."
                    placeholderTextColor="#6C757D"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
        </SafeAreaView>
      </View>

      {/* Quick Actions */}
      <View className="flex-1 px-6 -mt-8">
        <View className="flex-row justify-between mb-8">
            {[
                { icon: "navigate", label: "Navigate", route: "/(tabs)/services" },
                { icon: "airplane", label: "My Flight", route: "/(tabs)/flights" },
                { icon: "fast-food", label: "Eat", route: "/(tabs)/services" },
                { icon: "help-buoy", label: "Help", route: "/(tabs)/services" },
            ].map((action, index) => (
                <TouchableOpacity 
                    key={index}
                    onPress={() => router.push(action.route as any)}
                    className="items-center"
                >
                    <View className="w-16 h-16 rounded-2xl bg-white items-center justify-center shadow-card mb-2">
                        <Ionicons name={action.icon as any} size={28} color="#005B8F" />
                    </View>
                    <Text className="text-dark-text font-medium text-xs">{action.label}</Text>
                </TouchableOpacity>
            ))}
        </View>

        {/* Featured Card */}
        <Text className="text-dark-text text-xl font-bold mb-4">Featured</Text>
        <TouchableOpacity 
            activeOpacity={0.9}
            className="bg-white rounded-3xl p-4 shadow-card flex-row items-center"
            onPress={() => router.push("/(tabs)/services")}
        >
            <View className="w-24 h-24 rounded-2xl bg-secondary items-center justify-center mr-4">
                <Ionicons name="cafe" size={40} color="#FFF" />
            </View>
            <View className="flex-1">
                <View className="bg-accent/20 self-start px-2 py-1 rounded-md mb-2">
                    <Text className="text-accent text-xs font-bold uppercase">Recommended</Text>
                </View>
                <Text className="text-dark-text text-lg font-bold mb-1">Serendib Lounge</Text>
                <Text className="text-gray-text text-sm">Relax before your flight with premium amenities.</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
