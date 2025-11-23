import React from 'react';
import { View, ViewProps } from 'react-native';

interface NeumorphicViewProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  style?: any;
}

export const NeumorphicView: React.FC<NeumorphicViewProps> = ({ 
  children, 
  className = "", 
  style,
  ...props 
}) => {
  // We simulate the double shadow by using the main view for one shadow and a wrapper or internal logic if needed.
  // For simplicity and cross-platform compatibility with NativeWind, we'll rely on the custom classes we added.
  // However, React Native shadow support is limited. 
  // We will use a layered approach:
  // 1. Bottom-right dark shadow
  // 2. Top-left light shadow (simulated with a white border or another view if possible, but standard RN doesn't support negative offsets well on Android without elevation hacks)
  
  // Since we are using NativeWind, we will apply the class names.
  // Note: "shadow-neu-out" defined in tailwind.config.js might need specific handling if NativeWind doesn't fully support complex box-shadow strings on Native.
  // NativeWind v4 might handle it better, but often we need separate views for light and dark shadows in RN.
  
  return (
    <View 
      className={`bg-neu-bg rounded-xl ${className}`} 
      style={[
        // Manual shadow styles for better control if tailwind class fails
        {
          shadowColor: '#A3B1C6',
          shadowOffset: { width: 10, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 10, // Android fallback
        },
        style
      ]}
      {...props}
    >
      {/* Light Shadow Layer - Absolute positioned to create the top-left highlight */}
      <View 
        className="absolute inset-0 rounded-xl"
        style={{
          shadowColor: '#FFFFFF',
          shadowOffset: { width: -10, height: -10 },
          shadowOpacity: 1,
          shadowRadius: 10,
          zIndex: -1,
        }} 
      />
      {children}
    </View>
  );
};
