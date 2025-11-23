import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Minimal start screen; manual navigation only (no auto redirect).
export default function StartScreen() {
  const router = useRouter();

  // Removed auto redirect per user request.

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <StatusBar barStyle="dark-content" />
      <View className="items-center mb-10">
        <Text className="text-4xl font-bold text-primary mb-2">Airport</Text>
        <Text className="text-2xl font-semibold text-gray-700">Navigator</Text>
      </View>
      <Text className="text-gray-500 text-center px-10 mb-8">
        Smart, fast wayfinding inside the terminal. Let’s go.
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/dashboard")}
        className="bg-primary px-8 py-4 rounded-xl shadow-lg"
        activeOpacity={0.85}
      >
        <Text className="text-white font-bold tracking-wide">GET STARTED</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
