import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NeumorphicView } from './NeumorphicView';

export const BottomNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: 'home', icon: 'home', label: 'Home', route: '/navigation-home' },
    { id: 'map', icon: 'map', label: 'Map', route: '/map-preview' }, // Assuming map preview is a main tab for now, or just a placeholder
    { id: 'settings', icon: 'settings', label: 'Settings', route: '/settings' }, // Placeholder
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-2 bg-transparent">
      <NeumorphicView className="flex-row justify-around items-center py-4 px-2 rounded-full">
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(item.route as any)}
              className="items-center justify-center w-16 h-16"
            >
              <View 
                className={`items-center justify-center rounded-full w-12 h-12 ${isActive ? 'bg-neu-bg' : 'bg-transparent'}`}
                style={isActive ? {
                    // Pressed/Active State (Inset)
                    shadowColor: '#FFFFFF',
                    shadowOffset: { width: -2, height: -2 },
                    shadowOpacity: 1,
                    shadowRadius: 4,
                    elevation: 2,
                    borderWidth: 1,
                    borderColor: 'rgba(163,177,198, 0.3)'
                } : {}}
              >
                 {/* Inner shadow for active state simulation if needed, but simple inset border/highlight works well */}
                 {isActive && (
                    <View 
                        className="absolute inset-0 rounded-full bg-black/5"
                        style={{ zIndex: -1 }}
                    />
                 )}
                <Ionicons 
                    name={item.icon as any} 
                    size={24} 
                    color={isActive ? "#1A1A1A" : "#9E9E9E"} 
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </NeumorphicView>
    </View>
  );
};
