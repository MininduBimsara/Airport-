import React, { useState } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

interface NeumorphicButtonProps extends PressableProps {
  children?: React.ReactNode;
  className?: string;
  textClassName?: string;
  label?: string;
  variant?: 'primary' | 'secondary';
}

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  children,
  className = "",
  textClassName = "",
  label,
  variant = 'primary',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`items-center justify-center ${className}`}
      {...props}
    >
      <View
        className={`bg-neu-bg rounded-full px-6 py-4 ${isPressed ? 'bg-neu-bg' : 'bg-neu-bg'}`}
        style={
            isPressed 
            ? {
                // Pressed State (Inset simulation or flat)
                borderColor: '#E0E5EC',
                borderWidth: 1,
            }
            : {
                // Default State (Raised)
                shadowColor: '#A3B1C6',
                shadowOffset: { width: 6, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
                elevation: 5,
            }
        }
      >
        {/* Light Shadow for Raised State */}
        {!isPressed && (
            <View 
                className="absolute inset-0 rounded-full"
                style={{
                    shadowColor: '#FFFFFF',
                    shadowOffset: { width: -6, height: -6 },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                    zIndex: -1,
                }} 
            />
        )}

        {label ? (
          <Text className={`text-neu-dark-gray font-bold text-lg ${textClassName}`}>
            {label}
          </Text>
        ) : (
          children
        )}
      </View>
    </Pressable>
  );
};
