import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    Text,
    View
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { NeumorphicButton } from "../components/NeumorphicButton";
import { NeumorphicView } from "../components/NeumorphicView";

const { width } = Dimensions.get('window');

export default function StartScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-neu-bg items-center justify-center">
      <StatusBar barStyle="dark-content" backgroundColor="#E0E5EC" />
      
      <Animated.View style={[animatedStyle, { width: '100%', alignItems: 'center' }]}>
        
        {/* Main Icon / Logo Area */}
        <NeumorphicView className="w-48 h-48 items-center justify-center rounded-full mb-12">
            <Ionicons name="airplane" size={80} color="#4A4A4A" />
        </NeumorphicView>

        {/* Title */}
        <View className="mb-16 items-center">
            <Text className="text-neu-dark-gray text-4xl font-bold mb-2 tracking-wider">
                AIRPORT
            </Text>
            <Text className="text-neu-gray text-xl tracking-widest uppercase">
                Navigator
            </Text>
        </View>

        {/* Get Started Button */}
        <NeumorphicButton 
            onPress={() => router.push("/navigation-home")}
            className="w-64"
            label="GET STARTED"
        />

      </Animated.View>
    </SafeAreaView>
  );
}
