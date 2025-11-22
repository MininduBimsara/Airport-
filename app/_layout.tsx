import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="navigation-home" />
      <Stack.Screen name="map-preview" />
      <Stack.Screen name="route-navigation" />
    </Stack>
  );
}
