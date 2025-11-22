# Airport Navigation App - Project Documentation

## Project Overview
A React Native application built with Expo to showcase a geospatial view of Bandaranaike International Airport (BIA). The app allows users to search for locations (ATMs, Cashiers, Gates, Shops) and view navigation paths using a custom UI with dummy data.

## Technology Stack
- **Framework**: React Native with Expo SDK 54
- **Routing**: Expo Router v6
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **Language**: TypeScript
- **Build Tool**: Metro Bundler

## Color Palette
Extracted from user-provided image:
- **Primary**: `#e50000` (Red)
- **Secondary**: `#000000` (Black)
- **Accent**: `#ee0000` (Lighter Red)
- **Background**: `#000000`
- **Surface**: `#1a1a1a` (Dark Gray for cards/inputs)

---

## Build Process & Steps Taken

### 1. Initial Planning
- Created implementation plan with component breakdown
- Defined UI structure: SearchBar, MapView, LocationMarker
- Planned dummy data structure for airport locations

### 2. Project Initialization
```bash
npx create-expo-app@latest temp_app --template default --yes
```
- Created project in temporary directory due to existing files
- Moved files to root directory
- Renamed app from "temp_app" to "Airport" in `app.json`

### 3. Dependencies Installation
```bash
npm install nativewind@^4.0.1 tailwindcss@^3.4.0 react-native-reanimated react-native-css-interop expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

### 4. Configuration Files Created

#### `tailwind.config.js`
```javascript
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#e50000',
        secondary: '#000000',
        accent: '#ee0000',
        background: '#000000',
        surface: '#1a1a1a',
      },
    },
  },
  plugins: [],
}
```

#### `global.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### `babel.config.js`
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

#### `metro.config.js`
```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
```

#### `tsconfig.json` (updated)
Added `jsxImportSource: "nativewind"` to compiler options.

#### `nativewind-env.d.ts`
```typescript
/// <reference types="nativewind/types" />
```

### 5. Project Structure
```
Airport-/
├── app/
│   ├── _layout.tsx          # Root layout with global CSS import
│   └── index.tsx            # Main screen
├── components/
│   ├── SearchBar.tsx        # Search input component
│   ├── MapView.tsx          # Map container with markers
│   └── LocationMarker.tsx   # Individual location markers
├── data/
│   └── dummyLocations.ts    # Mock location data
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
├── global.css
├── tsconfig.json
└── nativewind-env.d.ts
```

---

## Errors Encountered & Solutions

### Error 1: `styled is not a function`
**Problem**: 
```
TypeError: 0, _nativewind.styled is not a function (it is undefined)
```

**Root Cause**: NativeWind v4 deprecated the `styled()` wrapper function. The initial code used:
```tsx
import { styled } from 'nativewind';
const StyledView = styled(View);
```

**Solution**: Use `className` directly on React Native components:
```tsx
import { View } from 'react-native';
<View className="flex-1 bg-black">
```

**Files Fixed**:
- `components/SearchBar.tsx`
- `components/MapView.tsx`
- `components/LocationMarker.tsx`
- `app/index.tsx`

---

### Error 2: Metro Bundler Cache Issues
**Problem**: Changes not reflecting, persistent errors after fixes

**Solution**: 
```bash
npx expo start -c  # Clear cache flag
```

Also performed full reinstall:
```bash
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm install
```

---

### Error 3: Invalid or Unexpected Token in `expo-router/entry.js`
**Problem**:
```
ERROR node_modules\expo-router\entry.js: Invalid or unexpected token
```

**Root Cause**: Corrupted `babel.config.js` file with garbage characters from debugging commands:
```javascript
};
/ /  
 t o u c h  
```

**Solution**: Cleaned up `babel.config.js` to proper format and added Reanimated plugin.

---

### Error 4: Metro Config Load Failure
**Problem**:
```
Error: Found config at metro.config.js that could not be loaded with Node.js.
```

**Root Cause**: Used `withNativeWind()` wrapper from `nativewind/metro`:
```javascript
// WRONG - causes crash
const { withNativeWind } = require("nativewind/metro");
module.exports = withNativeWind(config, { input: "./global.css" });
```

**Solution**: NativeWind v4 with Expo doesn't require Metro config modifications. It works through the Babel plugin:
```javascript
// CORRECT
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
module.exports = config;
```

---

### Error 5: Tailwind Styles Not Applying
**Problem**: App running but no styles visible

**Root Cause**: NativeWind was temporarily disabled in Metro config during debugging

**Solution**: 
1. Re-enabled proper configuration
2. Ensured `global.css` imported first in `app/_layout.tsx`:
```tsx
import "../global.css";  // Must be first
import { Stack } from "expo-router";
```

---

## Key Learnings

### NativeWind v4 with Expo Setup
1. **No Metro Config Wrapper**: Unlike v2, NativeWind v4 doesn't use `withNativeWind()` in Metro config
2. **Babel Plugin is Key**: All transformation happens via `nativewind/babel` preset
3. **Direct className Usage**: No `styled()` wrapper needed - use `className` directly on components
4. **CSS Import Order**: Global CSS must be imported before any components

### Configuration Requirements
- `jsxImportSource: "nativewind"` in both `babel.config.js` and `tsconfig.json`
- `nativewind/preset` in `tailwind.config.js`
- Type definitions via `nativewind-env.d.ts`
- Reanimated plugin must be last in Babel plugins array

### Common Pitfalls
1. Using outdated NativeWind v2/v3 patterns with v4
2. Not clearing Metro cache after config changes
3. Incorrect import order in root layout
4. Missing TypeScript configuration for NativeWind

---

## Component Architecture

### SearchBar Component
- Text input with custom styling
- Filters locations in real-time
- Placeholder text for user guidance

### MapView Component
- Container for the airport map visualization
- Placeholder background with "BIA" text and concentric circles
- Renders location markers dynamically
- Handles marker press events

### LocationMarker Component
- Visual pin with red circular design
- Displays location name below marker
- Positioned using absolute layout with x/y coordinates
- Touchable for interaction

### Main Screen (app/index.tsx)
- Search state management
- Location filtering logic
- Modal for location details
- Navigation button (placeholder alert)

---

## Dummy Data Structure
```typescript
{
  id: string;
  name: string;
  type: 'ATM' | 'Cashier' | 'Shop' | 'Gate';
  x: number;  // Pixel position
  y: number;  // Pixel position
  description: string;
}
```

---

## Running the Application

### Development
```bash
npx expo start -c
```

### Platform-Specific
```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

---

## Future Enhancements
1. **Real GIS Integration**: Replace dummy data with actual airport floor plans
2. **Pathfinding**: Implement A* or Dijkstra algorithm for route calculation
3. **Real-time Navigation**: Turn-by-turn directions
4. **Multi-floor Support**: Handle different terminal levels
5. **Accessibility**: Voice guidance, high contrast mode
6. **Offline Support**: Cached maps and data
7. **User Location**: GPS integration for "You are here"

---

## Troubleshooting Guide

### Styles Not Showing
1. Clear Metro cache: `npx expo start -c`
2. Verify `global.css` imported first in `_layout.tsx`
3. Check `babel.config.js` has `nativewind/babel` preset
4. Ensure no `styled()` usage in components

### Metro Bundler Errors
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Clear cache and restart

### TypeScript Errors
1. Verify `jsxImportSource: "nativewind"` in `tsconfig.json`
2. Ensure `nativewind-env.d.ts` exists
3. Restart TypeScript server in IDE

---

## Dependencies Reference

### Production
- `expo`: ~54.0.25
- `expo-router`: ~6.0.15
- `nativewind`: ^4.0.1
- `react-native-css-interop`: ^0.2.1
- `react-native-reanimated`: ~4.1.1
- `react`: 19.1.0
- `react-native`: 0.81.5

### Development
- `tailwindcss`: ^3.3.2
- `typescript`: ~5.9.2
- `@types/react`: ~19.1.0

---

## Credits
- **Design**: Custom color palette from user-provided reference
- **Framework**: Expo Team
- **Styling**: NativeWind by Mark Lawlor
- **Airport**: Bandaranaike International Airport, Sri Lanka
