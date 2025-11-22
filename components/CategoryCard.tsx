import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CategoryCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, color, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 m-2 rounded-2xl p-6 shadow-lg items-center justify-center"
      style={{ backgroundColor: color, minHeight: 120 }}
      activeOpacity={0.8}
    >
      <View className="bg-white/20 p-4 rounded-full mb-3">
        <Ionicons name={icon} size={32} color="#ffffff" />
      </View>
      <Text className="text-white font-bold text-center text-base">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
