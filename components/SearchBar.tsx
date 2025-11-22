import React from 'react';
import { TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View className="w-full px-4 py-2 bg-surface rounded-full border border-primary/50 flex-row items-center shadow-md shadow-primary/20">
      <TextInput
        className="flex-1 text-white text-lg font-medium p-2"
        placeholder="Search ATM, Cashier..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
