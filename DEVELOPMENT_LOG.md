# Airport App - Development Log

## Project Overview

Airport navigation app built with React Native, Expo, and NativeWind (Tailwind CSS for React Native).

**Tech Stack:**

- Expo SDK 54.0.19
- React Native 0.81.5
- NativeWind 4.2.1 (Tailwind CSS v3.4.18)
- React Navigation 7.x
- TypeScript 5.9.2

---

## Issues Encountered & Solutions

### Issue #1: Tailwind CSS Styles Not Displaying

**Date:** November 21, 2025

**Problem:**

- Tailwind CSS classes were not being applied to components
- Styles like `className="bg-black"`, `className="text-primary"` were not working

**Root Cause:**

1. Incorrect Babel configuration for NativeWind v4
2. Missing/incorrect Metro bundler configuration
3. Corrupted `tailwind.config.js` file with null bytes

**Solution Steps:**

1. Fixed `babel.config.js`:

   ```javascript
   module.exports = function (api) {
     api.cache(true);
     return {
       presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
       plugins: ["react-native-reanimated/plugin"],
     };
   };
   ```

2. Updated `metro.config.js`:

   ```javascript
   const { getDefaultConfig } = require("expo/metro-config");
   const { withNativeWind } = require("nativewind/metro");

   const config = getDefaultConfig(__dirname);

   module.exports = withNativeWind(config, { input: "./global.css" });
   ```

3. Created clean `tailwind.config.js`:

   ```javascript
   module.exports = {
     content: [
       "./App.{js,jsx,ts,tsx}",
       "./app/**/*.{js,jsx,ts,tsx}",
       "./components/**/*.{js,jsx,ts,tsx}",
       "./screens/**/*.{js,jsx,ts,tsx}",
     ],
     presets: [require("nativewind/preset")],
     theme: {
       extend: {
         colors: {
           navy: "#0A1128",
           gold: "#FFD700",
           "light-gold": "#FFF4CC",
         },
       },
     },
     plugins: [],
   };
   ```

4. Simplified `tsconfig.json`:
   ```json
   {
     "extends": "expo/tsconfig.base",
     "compilerOptions": {
       "strict": true,
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

**Status:** ✅ Resolved

---

### Issue #2: Babel Plugin Error

**Date:** November 21, 2025

**Error Message:**

```
[BABEL] .plugins is not a valid Plugin property
```

**Root Cause:**

- Using wrong preset configuration syntax
- `nativewind/babel` was incorrectly placed in presets array

**Solution:**

- Removed `nativewind/babel` from plugins array
- Used `jsxImportSource: "nativewind"` in babel-preset-expo options instead
- This is the correct configuration for NativeWind v4 with Expo SDK 54

**Status:** ✅ Resolved

---

### Issue #3: Dependency Version Mismatches

**Date:** November 21, 2025

**Problem:**

- Package version warnings appearing during npm install
- Inconsistent caret (^) and tilde (~) versioning causing confusion

**Solution:**
Updated `package.json` to use exact versions for key dependencies:

```json
{
  "dependencies": {
    "@expo/vector-icons": "15.0.3",
    "@react-navigation/bottom-tabs": "7.5.0",
    "@react-navigation/elements": "2.6.3",
    "@react-navigation/native": "7.1.18",
    "nativewind": "4.2.1",
    "react-native-reanimated": "~4.1.1"
  },
  "devDependencies": {
    "babel-preset-expo": "54.0.6",
    "eslint": "9.25.0",
    "tailwindcss": "3.4.18"
  }
}
```

**Status:** ✅ Resolved

---

### Issue #4: Missing @react-navigation/elements

**Date:** November 21, 2025

**Error Message:**

```
Unable to resolve "@react-navigation/elements" from "components\haptic-tab.tsx"
```

**Root Cause:**

- `@react-navigation/elements` package was not in dependencies
- Component `HapticTab` required this package for `PlatformPressable`

**Solution:**
Added missing dependency:

```bash
npm install @react-navigation/elements@2.6.3
```

**Status:** ✅ Resolved

---

### Issue #5: Path Alias Resolution Error

**Date:** November 21, 2025

**Error Message:**

```
Unable to resolve "@/components/haptic-tab" from "app\(tabs)\_layout.tsx"
```

**Root Cause:**

- TypeScript path alias `@/*` was removed from `tsconfig.json`
- Metro bundler couldn't resolve the import paths

**Solution:**
Added path alias back to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Status:** ✅ Resolved

---

### Issue #6: React Native Reanimated Crash (Critical)

**Date:** November 21, 2025

**Error Message:**

```
Exception in HostObject::get for prop 'ReanimatedModule':
java.lang.NullPointerException
```

**Root Cause:**

- Using Expo Go which has built-in `react-native-reanimated` version
- Version mismatch between project's reanimated (3.10.1) and Expo Go's built-in version
- Expo SDK 54 expects reanimated ~4.1.1 but the built-in version in Expo Go may differ

**Solution Approaches:**

**Option A (Temporary - Implemented):**
Removed reanimated usage from components to work with Expo Go:

1. Updated `components/parallax-scroll-view.tsx`:

   - Replaced `Animated.ScrollView` with regular `ScrollView`
   - Replaced `Animated.View` with regular `View`
   - Removed all animation logic (interpolate, useAnimatedStyle, etc.)

2. Updated `components/hello-wave.tsx`:
   - Replaced `Animated.Text` with regular `Text`
   - Removed animation properties

**Option B (Production - Not Implemented Yet):**
Create a development build:

```bash
npx expo prebuild
npx expo run:android
```

This allows using custom native module versions including react-native-reanimated.

**Status:** ✅ Resolved (Temporary solution implemented)

**Future Action Required:**
When ready for production or needing animations, switch to Option B (development build).

---

## Current Configuration

### Package Versions (Working Configuration)

```json
{
  "dependencies": {
    "@expo/vector-icons": "15.0.3",
    "@react-navigation/bottom-tabs": "7.5.0",
    "@react-navigation/elements": "2.6.3",
    "@react-navigation/native": "7.1.18",
    "expo": "~54.0.19",
    "nativewind": "4.2.1",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "react-native-reanimated": "~4.1.1",
    "tailwindcss": "3.4.18"
  }
}
```

### Key Configuration Files

**babel.config.js:**

- Uses `babel-preset-expo` with `jsxImportSource: "nativewind"`
- Includes `react-native-reanimated/plugin` (required even if not using animations)

**metro.config.js:**

- Uses `withNativeWind` wrapper for NativeWind v4 support
- Points to `./global.css` for Tailwind styles

**tsconfig.json:**

- Path alias `@/*` maps to project root
- Strict mode enabled

---

## Best Practices Established

1. **Use Exact Versions:** Pin critical dependencies to exact versions to avoid compatibility issues
2. **Clear Cache Often:** Run `npx expo start -c` when changing configurations
3. **Path Aliases:** Use `@/` prefix for cleaner imports
4. **NativeWind Setup:** Follow NativeWind v4 specific configuration (not v3 or earlier)
5. **Expo Go Limitations:** Be aware of native module constraints in Expo Go vs development builds

---

## Commands Reference

### Development

```bash
# Start development server
npm start
# or
npx expo start

# Start with cleared cache
npx expo start -c

# Open on Android (Expo Go)
npx expo start --android

# Open on iOS (Expo Go)
npx expo start --ios
```

### Building

```bash
# Create development build (when needed)
npx expo prebuild
npx expo run:android
npx expo run:ios
```

### Troubleshooting

```bash
# Clear all caches
npx expo start -c --clear

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check package versions
npm list [package-name]
```

---

## Next Steps / TODO

- [ ] Implement actual Airport navigation features
- [ ] Add map integration for indoor navigation
- [ ] Implement location search functionality
- [ ] Consider switching to development build for animations
- [ ] Set up proper error boundaries
- [ ] Add unit tests
- [ ] Configure CI/CD pipeline
- [ ] Add environment configuration (.env)

---

## Notes

- This project uses Expo Go for development (as of Nov 21, 2025)
- Animations are temporarily disabled due to Expo Go limitations
- Custom colors defined: navy (#0A1128), gold (#FFD700), light-gold (#FFF4CC)
- All Tailwind classes work properly with current setup

---

**Last Updated:** November 21, 2025
**Status:** Development Environment Stable ✅

---

### UI Redesign & Theme Update

**Date:** November 23, 2025

**Changes:**
- **Theme Overhaul**: Replaced Red/Black theme with SriLankan Airlines-inspired Ocean Blue palette.
- **Home Screen**: Redesigned with Navbar, Hero Image, and Feature Cards.
- **Search**: Implemented Map-based search results with interactive markers.
- **Navigation**: Added explicit back buttons and improved route visualization.
- **Assets**: Added generated images for Hero, Search, Navigation, and Services.

**Documentation:**
- Detailed breakdown available in docs/UI_REDESIGN_2025.md.

