import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Minimal start screen; manual navigation only (no auto redirect).
export default function StartScreen() {
  const router = useRouter();

  // Removed auto redirect per user request.

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" }}
        className="flex-1"
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,51,85,0.7)', 'rgba(0,91,143,0.9)']}
          className="flex-1"
        >
          <SafeAreaView className="flex-1 items-center justify-center px-6">
            <View className="items-center mb-10">
              <Text className="text-5xl font-bold text-white mb-2">Airport</Text>
              <Text className="text-2xl font-semibold text-accent">Navigator</Text>
            </View>
            <Text className="text-white text-center text-lg px-10 mb-12 leading-6">
              Smart, fast wayfinding inside the terminal. Let's go.
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/dashboard")}
              className="bg-accent px-10 py-5 rounded-2xl shadow-lg"
              activeOpacity={0.85}
            >
              <Text className="text-primary font-bold text-lg tracking-wide">GET STARTED</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
