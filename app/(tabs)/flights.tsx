import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FlightsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-off-white">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View className="px-6 pt-6 pb-4 bg-white shadow-sm z-10">
        <Text className="text-primary text-3xl font-bold">Flights</Text>
        <Text className="text-gray-text text-base">
          Track flights & check-in
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Flight Status Card */}
        <View className="bg-primary rounded-3xl p-6 mb-6 shadow-floating">
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-white/70 text-sm font-medium uppercase tracking-wider">Flight</Text>
                    <Text className="text-white text-2xl font-bold">UL 504</Text>
                </View>
                <View className="items-end">
                    <Text className="text-white/70 text-sm font-medium uppercase tracking-wider">Gate</Text>
                    <Text className="text-accent text-2xl font-bold">A12</Text>
                </View>
            </View>

            <View className="flex-row items-center justify-between mb-2">
                <View>
                    <Text className="text-white text-3xl font-bold">CMB</Text>
                    <Text className="text-white/70 text-sm">Colombo</Text>
                </View>
                <View className="items-center">
                    <Ionicons name="airplane" size={24} color="#D4AF37" />
                    <Text className="text-white/50 text-xs mt-1">4h 30m</Text>
                </View>
                <View className="items-end">
                    <Text className="text-white text-3xl font-bold">LHR</Text>
                    <Text className="text-white/70 text-sm">London</Text>
                </View>
            </View>
            
            <View className="mt-6 pt-6 border-t border-white/20 flex-row justify-between">
                 <View>
                    <Text className="text-white/70 text-sm font-medium uppercase tracking-wider">Boarding</Text>
                    <Text className="text-white text-lg font-bold">10:45 AM</Text>
                </View>
                 <View className="items-end">
                    <Text className="text-white/70 text-sm font-medium uppercase tracking-wider">Status</Text>
                    <Text className="text-secondary text-lg font-bold">On Time</Text>
                </View>
            </View>
        </View>

        {/* Actions Grid */}
        <Text className="text-dark-text text-xl font-bold mb-4">Quick Actions</Text>
        <View className="flex-row flex-wrap justify-between">
            {[
                { icon: "qr-code", label: "Boarding Pass", color: "#005B8F" },
                { icon: "briefcase", label: "Baggage", color: "#0FA3B1" },
                { icon: "restaurant", label: "Pre-order Meal", color: "#C8102E" },
                { icon: "notifications", label: "Alerts", color: "#D4AF37" },
            ].map((action, index) => (
                <TouchableOpacity 
                    key={index}
                    className="w-[48%] bg-white p-4 rounded-2xl mb-4 shadow-card items-center justify-center h-32"
                >
                    <View className="w-12 h-12 rounded-full items-center justify-center mb-3" style={{ backgroundColor: `${action.color}15` }}>
                        <Ionicons name={action.icon as any} size={24} color={action.color} />
                    </View>
                    <Text className="text-dark-text font-semibold">{action.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
