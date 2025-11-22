import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";

export default function StartScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withSpring(0, { damping: 15 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-sky-light">
      <StatusBar barStyle="dark-content" backgroundColor="#E0F4FF" />
      
      {/* Gradient Background Effect */}
      <View className="absolute inset-0 bg-gradient-to-b from-sky-light via-sky to-sky-dark opacity-20" />

      <Animated.View style={[{ flex: 1 }, animatedStyle]} className="justify-center items-center px-6">
        {/* Airport Icon/Illustration */}
        <View className="bg-white/80 p-8 rounded-full mb-8 shadow-xl">
          <Ionicons name="airplane" size={80} color="#2a658a" />
        </View>

        {/* Hero Text */}
        <Text className="text-primary text-4xl font-bold text-center mb-3">
          Airport Navigator
        </Text>
        <Text className="text-primary text-xl text-center mb-2">
          Your Guide inside BIA
        </Text>
        <Text className="text-gray-600 text-center text-base mb-12 px-4">
          Navigate Bandaranaike International Airport with ease. Find ATMs, gates, lounges, and more.
        </Text>

        {/* Start Navigation Button */}
        <TouchableOpacity
          onPress={() => router.push("/navigation-home" as any)}
          className="bg-primary rounded-2xl px-12 py-5 shadow-2xl w-full max-w-sm"
          activeOpacity={0.9}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="navigate" size={28} color="#ffffff" />
            <Text className="text-white text-xl font-bold ml-3">
              Start Navigation
            </Text>
          </View>
        </TouchableOpacity>

        {/* Secondary Features */}
        <View className="flex-row mt-8 space-x-4">
          <TouchableOpacity className="bg-white/60 rounded-xl px-6 py-3 flex-row items-center">
            <Ionicons name="map-outline" size={20} color="#2a658a" />
            <Text className="text-primary font-semibold ml-2">View Map</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white/60 rounded-xl px-6 py-3 flex-row items-center">
            <Ionicons name="information-circle-outline" size={20} color="#2a658a" />
            <Text className="text-primary font-semibold ml-2">Help</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="absolute bottom-8">
          <Text className="text-gray-500 text-sm text-center">
            Powered by SriLankan Airlines inspired theme
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
