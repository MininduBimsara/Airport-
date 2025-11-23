import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface NavbarProps {
  currentRoute?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute = "home" }) => {
  const router = useRouter();

  const navItems = [
    { id: "home", label: "Home", icon: "home-outline" as const, route: "/" },
    { id: "search", label: "Search", icon: "search-outline" as const, route: "/search" },
    { id: "navigate", label: "Navigate", icon: "navigate-outline" as const, route: "/navigation-home" },
  ];

  return (
    <View className="bg-primary px-4 py-3 shadow-lg">
      <View className="flex-row items-center justify-between">
        {/* Logo/Title */}
        <View className="flex-row items-center">
          <Ionicons name="airplane" size={24} color="#66BCE8" />
          <Text className="text-white text-lg font-bold ml-2">
            Airport Navigator
          </Text>
        </View>

        {/* Nav Items */}
        <View className="flex-row space-x-4">
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(item.route as any)}
              className={`px-3 py-2 rounded-lg ${
                currentRoute === item.id ? "bg-sky-blue/30" : "bg-transparent"
              }`}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={currentRoute === item.id ? "#66BCE8" : "#8FBFD9"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Navbar;
