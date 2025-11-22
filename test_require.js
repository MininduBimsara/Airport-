try {
  require("nativewind/metro");
  console.log("nativewind/metro loaded successfully");
} catch (error) {
  console.error("Failed to load nativewind/metro:", error);
}

try {
  require("expo/metro-config");
  console.log("expo/metro-config loaded successfully");
} catch (error) {
  console.error("Failed to load expo/metro-config:", error);
}
