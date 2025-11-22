/**
 * Metro configuration for React Native + Expo + NativeWind v4
 * Compatible with Expo SDK 54
 */

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
