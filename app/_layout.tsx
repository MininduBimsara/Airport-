import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ErrorBoundary from "../components/ErrorBoundary";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <Stack screenOptions={{ headerShown: false }}>
          {/* expo-router auto-detects groups; omit explicit (tabs) to avoid premature mount */}
          <Stack.Screen name="index" />
          <Stack.Screen name="map-preview" />
          <Stack.Screen name="route-navigation" />
        </Stack>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
