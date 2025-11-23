import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Place } from "../data/places";

interface PlaceCardProps {
  place: Place;
  onPress: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  // Get icon based on type
  const getIcon = (type: string): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case "ATM":
        return "cash-outline";
      case "Cashier":
        return "card-outline";
      case "Help Desk":
        return "information-circle-outline";
      case "Gate":
        return "airplane-outline";
      case "Lounge":
        return "bed-outline";
      case "Restroom":
        return "man-outline";
      case "Shop":
        return "cart-outline";
      case "Restaurant":
        return "restaurant-outline";
      case "Medical":
        return "medical-outline";
      default:
        return "location-outline";
    }
  };

  // Get color based on type
  const getTypeColor = (type: string): string => {
    switch (type) {
      case "ATM":
        return "#0FA3B1"; // turquoise
      case "Cashier":
        return "#3BA99C"; // teal green
      case "Help Desk":
        return "#005B8F"; // primary blue
      case "Gate":
        return "#66BCE8"; // sky blue
      case "Lounge":
        return "#3BA99C"; // teal green
      case "Restroom":
        return "#0FA3B1"; // turquoise
      case "Shop":
        return "#66BCE8"; // sky blue
      case "Restaurant":
        return "#3BA99C"; // teal green
      case "Medical":
        return "#3BA99C"; // teal green
      default:
        return "#005B8F"; // primary blue
    }
  };

  const iconColor = getTypeColor(place.type);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 shadow-md border border-gray-100"
      activeOpacity={0.7}
    >
      <View className="flex-row items-start">
        {/* Icon */}
        <View
          className="w-12 h-12 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Ionicons name={getIcon(place.type)} size={24} color={iconColor} />
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-gray-900 text-lg font-bold mb-1">
            {place.name}
          </Text>
          <View className="flex-row items-center mb-2">
            <View
              className="px-2 py-1 rounded-md mr-2"
              style={{ backgroundColor: `${iconColor}20` }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: iconColor }}
              >
                {place.type}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="layers-outline" size={12} color="#6b7280" />
              <Text className="text-gray-500 text-xs ml-1">{place.floor}</Text>
            </View>
          </View>
          <Text className="text-gray-600 text-sm" numberOfLines={2}>
            {place.description}
          </Text>
        </View>

        {/* Distance & Navigate */}
        <View className="items-end ml-2">
          <View className="flex-row items-center mb-2">
            <Ionicons name="walk-outline" size={14} color="#6b7280" />
            <Text className="text-gray-600 text-sm font-medium ml-1">
              {place.distance}m
            </Text>
          </View>
          <TouchableOpacity
            className="bg-primary px-4 py-2 rounded-lg"
            onPress={onPress}
          >
            <Text className="text-white text-xs font-bold">Navigate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceCard;
