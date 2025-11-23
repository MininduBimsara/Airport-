Here is the complete documentation in **Markdown (.md)** format, ready to be saved as `README.md` or `DOCUMENTATION.md`.

# Airport Navigator App - Complete Master Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & File Structure](#architecture--file-structure)
4. [Design System](#design-system)
5. [Development Timeline & Logs](#development-timeline--logs)
6. [Features & Implementation](#features--implementation)
7. [Technical Challenges & Solutions](#technical-challenges--solutions)
8. [Configuration Files](#configuration-files)
9. [Running the Application](#running-the-application)
10. [Data Layer](#data-layer)
11. [Future Roadmap](#future-roadmap)
12. [Best Practices Established](#best-practices-established)
13. [TypeScript Interfaces & Types](#typescript-interfaces--types)
14. [Styling Guidelines](#styling-guidelines)
15. [Component Patterns](#component-patterns)
16. [Navigation Patterns](#navigation-patterns)
17. [Testing Checklist](#testing-checklist)
18. [Performance, Security & Accessibility](#performance-security--accessibility)
19. [Deployment & Maintenance](#deployment--maintenance)
20. [Appendix & History](#appendix--history)

---

## Project Overview

Airport Navigator is a React Native mobile application built with Expo, designed to help travelers navigate Bandaranaike International Airport (BIA). The app features indoor navigation, flight tracking, and service discovery with a professional UI inspired by SriLankan Airlines.

**Key Achievements:**

- Complete UI redesign from Neumorphic to Realistic aesthetic
- Theme evolution from Red/Black to Sky-Blue palette
- Integration of `react-native-maps` for geospatial navigation
- Resolution of critical navigation and routing issues
- Implementation of seamless 4-screen navigation flow

---

## Technology Stack

- **Framework:** Expo SDK 54.0.19
- **React Native:** 0.81.5
- **React:** 19.1.0
- **TypeScript:** 5.9.2
- **Routing:** Expo Router v6.0.15 (File-based routing)
- **Styling:** NativeWind 4.2.1 (Tailwind CSS v3.4.18 for React Native)
- **Animations:** React Native Reanimated ~4.1.1
- **Maps:** React Native Maps
- **Icons:** Expo Vector Icons (Ionicons)
- **Gradients:** Expo Linear Gradient
- **Navigation:** React Navigation 7.x
  - `@react-navigation/bottom-tabs` 7.5.0
  - `@react-navigation/elements` 2.6.3
  - `@react-navigation/native` 7.1.18
- **Safe Area:** `react-native-safe-area-context` ~5.6.0

---

## Architecture & File Structure

```text
Airport/
├── app/
│   ├── _layout.tsx                 # Root layout with SafeAreaProvider
│   ├── index.tsx                   # Start Screen (Landing Page)
│   ├── (tabs)/                     # Tab Navigator Group
│   │   ├── _layout.tsx             # Tab configuration
│   │   ├── dashboard.tsx           # Main Dashboard (Home)
│   │   ├── services.tsx            # Services & Amenities Explorer
│   │   └── flights.tsx             # Flight Status & Check-in
│   ├── navigation-home.tsx         # Search & Grid Navigation
│   ├── map-preview.tsx             # Single Location Map View
│   ├── route-navigation.tsx        # Active Navigation with Route
│   ├── search.tsx                  # Search & Navigate Screen
│   └── route-preview.tsx           # Route Preview with Directions
│
├── components/
│   ├── CategoryCard.tsx            # Reusable Grid Component
│   ├── PlaceCard.tsx               # Reusable Place Card
│   ├── MapView.tsx                 # Map Container with Markers
│   ├── SearchBar.tsx               # Search Input Component
│   ├── LocationMarker.tsx          # Location Pin Component
│   ├── parallax-scroll-view.tsx    # Parallax Component (animations disabled)
│   ├── hello-wave.tsx              # Wave Component (animations disabled)
│   └── haptic-tab.tsx              # Haptic Feedback Tab
│
├── data/
│   ├── places.ts                   # 15 Locations + Coordinates + Directions
│   └── dummyLocations.ts           # Original Mock Data
│
├── babel.config.js                 # Babel configuration with NativeWind
├── metro.config.js                 # Metro bundler config
├── tailwind.config.js              # Tailwind CSS configuration
├── global.css                      # Global CSS imports
├── tsconfig.json                   # TypeScript configuration
├── nativewind-env.d.ts             # NativeWind type definitions
├── app.json                        # Expo configuration
└── package.json                    # Dependencies
```

### Key Navigation Flows

1.  **Onboarding:** `index.tsx` (Start Screen) → `(tabs)/dashboard`
2.  **Dashboard:** Access to Services, Flights, and Map
3.  **Services:** List of amenities → `map-preview` (Location details)
4.  **Navigation:** `map-preview` → `route-navigation` (Pathfinding)
5.  **Search Flow:** `navigation-home.tsx` → `map-preview.tsx` → `route-navigation.tsx`

---

## Design System

### Evolution of Color Palettes

**Phase 1: Original Red/Black Theme**

```javascript
primary: "#e50000"; // Red
secondary: "#000000"; // Black
accent: "#ee0000"; // Bright Red
background: "#000000"; // Black
surface: "#1a1a1a"; // Dark Grey
```

**Phase 2: Multi-Color Theme**

```javascript
primary: "#dc141b"; // Red - CTAs, Gates, Medical
secondary: "#04a51b"; // Green - ATMs, Restaurants
accent: "#ef6c1a"; // Orange - Cashiers, Shops
teal: "#4d8e7b"; // Teal - Lounges
navy: "#2a658a"; // Navy Blue - Help Desks
cyan: "#518494"; // Cyan - Restrooms
```

**Phase 3: SriLankan Airlines Theme**

```javascript
primary: "#005B8F"; // Brand Blue
teal: "#0FA3B1"; // Secondary Accents
gold: "#D4AF37"; // Premium Highlights
red: "#C8102E"; // Alerts/Important
background: "#F8F9FA"; // Off-white
```

**Phase 4: Current Sky-Blue Theme (Final)**

```javascript
primary: "#2a658a"; // Navy Blue - Headers, Main Buttons, Text
secondary: "#518494"; // Cyan - Secondary Actions, Badges
accent: "#4d8e7b"; // Teal - Highlights, Success States
sky: "#87CEEB"; // Sky Blue - Gradients, Backgrounds
skyLight: "#E0F4FF"; // Light Blue - Page Backgrounds
skyDark: "#4A90B8"; // Dark Sky Blue - Gradient Endpoints
success: "#04a51b"; // Green - Status Indicators
warning: "#ef6c1a"; // Orange - Alerts (sparingly used)
```

### Typography & Styling

- **Font:** System default sans-serif with bold weights for headers
- **Styling Engine:** NativeWind (Tailwind CSS for React Native)
- **Components:** Rounded corners (`rounded-xl`, `rounded-2xl`), soft shadows (`shadow-lg`), gradient backgrounds
- **Shadows:** Custom shadow utilities (`shadow-card`, `shadow-floating`) for depth

---

## Development Timeline & Logs

### Stage 1: Initial Setup (November 21, 2025)

**1.1 Project Creation**

- `npx create-expo-app@latest temp_app --template default --yes`
- Created project in temporary directory, moved files to root, renamed app to "Airport" in app.json.

**1.2 Dependencies Installation**

- `npm install nativewind@^4.0.1 tailwindcss@^3.4.0 react-native-reanimated react-native-css-interop expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar @react-navigation/bottom-tabs @react-navigation/elements @react-navigation/native`

**1.3 Configuration Files Setup**

- Created `tailwind.config.js` with Red/Black theme
- Created `global.css` with Tailwind directives
- Configured `babel.config.js` with NativeWind preset
- Set up `metro.config.js`
- Updated `tsconfig.json` with `jsxImportSource: "nativewind"`
- Created `nativewind-env.d.ts` for type definitions

**1.4 Initial Components**

- Created `SearchBar.tsx`, `MapView.tsx`, `LocationMarker.tsx`
- Created `dummyLocations.ts` with 10 locations

**Issues Encountered:**

- **Issue \#1:** Tailwind Styles Not Displaying. _Cause:_ Incorrect Babel configuration. _Solution:_ Fixed Babel preset, cleaned config.
- **Issue \#2:** `styled is not a function` Error. _Cause:_ Using deprecated NativeWind v2 wrapper in v4. _Solution:_ Removed styled() wrapper, used `className` directly.
- **Issue \#3:** Metro Bundler Cache Issues. _Solution:_ `npx expo start -c`, deleted node_modules.
- **Issue \#4:** Invalid Token in expo-router/entry.js. _Cause:_ Corrupted babel config. _Solution:_ Cleaned up babel config.
- **Issue \#5:** Metro Config Load Failure. _Cause:_ Incorrect `withNativeWind` usage. _Solution:_ Removed Metro wrapper (NativeWind v4 uses Babel).

### Stage 2: Multi-Color Theme & Search (November 21, 2025)

**2.1 Enhanced Color Palette**

- Introduced 6-color system for different place types and updated tailwind config.

**2.2 New Screens & Components**

- Created `search.tsx`, `route-preview.tsx`
- Enhanced `places.ts` with 15 locations
- Created `PlaceCard.tsx`, added category filters and distance sorting.

### Stage 3: React Native Reanimated Issues (November 21, 2025)

**Issue \#6: Reanimated Module Crash (Critical)**

- _Error:_ `Exception in HostObject::get for prop 'ReanimatedModule': java.lang.NullPointerException`
- _Cause:_ Version mismatch between project reanimated (3.10.1) and Expo Go's built-in version (expects \~4.1.1).
- _Solution:_ Removed reanimated usage from `parallax-scroll-view.tsx` and `hello-wave.tsx` temporarily.

### Stage 4: SriLankan Airlines Theme (November 23, 2025)

**4.1 Complete UI Overhaul**

- Replaced Neumorphic design with Realistic aesthetic.
- Adopted SriLankan Airlines color palette.

**4.2 Screen Redesigns**

- **Start Screen:** Full-screen airport terminal background, smooth entry.
- **Dashboard:** Hero section with image, prominent search bar, Quick Actions.
- **Navigation Architecture:** Created `app/(tabs)/_layout.tsx`, `dashboard.tsx`, `services.tsx`, `flights.tsx`.

**Issue \#7: LinkingContext Error (Critical)**

- _Error:_ `ERROR [Error: Couldn't find a LinkingContext context.]`
- _Causes:_ Route naming conflict between `app/index.tsx` and `app/(tabs)/index.tsx`; Missing `SafeAreaProvider`; Auto-redirect triggering too early.
- _Solution:_ Renamed `app/(tabs)/index.tsx` → `app/(tabs)/dashboard.tsx`; Wrapped app in `SafeAreaProvider`; Removed auto-redirect; Changed `router.replace` to `router.push`.

**Issue \#8 & \#9:** Fixed Navbar Alignment and Start Screen Visibility on Android.

### Stage 5: Sky-Blue Theme & Maps (November 23, 2025)

**5.1 Final Theme Transition**

- Complete removal of all red colors; implementation of Sky-Blue gradient theme.

**5.2 Maps Integration & Navigation**

- `npm install react-native-maps expo-linear-gradient`
- Created `navigation-home.tsx` (Grid), `map-preview.tsx`, `route-navigation.tsx`.
- Created `CategoryCard.tsx` component.

**5.3 Data Layer Enhancement**

- Added coordinates to all 15 locations.
- Implemented `getRoutePolyline()` and `getDirections()`.

**Issue \#10: Navigation Mounting Error.** _Solution:_ Refactored `index.tsx`, removed redirect logic.
**Issue \#11: Map Not Loading.** _Cause:_ PROVIDER*GOOGLE requiring API keys. \_Solution:* Removed provider to use default OS map.
**Issue \#12: File Corruption.** _Solution:_ Recreated `route-navigation.tsx`.

---

## Features & Implementation

**Start Screen (`app/index.tsx`)**

- Animated fade-in entry using Reanimated.
- Hero section with large airport icon.
- "Start Navigation" CTA (manual button press).

**Dashboard (`app/(tabs)/dashboard.tsx`)**

- Hero Section with airport terminal background.
- Search bar for finding gates, food, shops.
- Quick Actions: Navigate, My Flight, Eat, Help.
- Featured premium services (lounges).

**Services (`app/(tabs)/services.tsx`)**

- List of all airport services with category filtering.
- Navigation to map preview.

**Flights (`app/(tabs)/flights.tsx`)**

- Real-time flight status display (mocked).
- Quick Actions: Boarding Pass, Baggage, Meals, Alerts.

**Navigation Home (`app/navigation-home.tsx`)**

- Real-time search bar with filtering.
- 2-column category grid (CategoryCard).
- Popular destinations list.

**Map Preview (`app/map-preview.tsx`)**

- Interactive map using `react-native-maps`.
- Info card with floor, description, distance.
- Marker drop animation.
- Uses default OS map provider (no API keys needed).

**Route Navigation (`app/route-navigation.tsx`)**

- Polyline route visualization from Airport Center to destination.
- Step-by-step scrollable directions.
- Stats display: estimated walk time and distance.
- Map controls: auto-fits view to show entire route.

**Search Screen (`app/search.tsx`)**

- Advanced search, distance sorting, results counter.

**Route Preview (`app/route-preview.tsx`)**

- Text-based preview of route steps and timeline.

---

## Technical Challenges & Solutions

| \#  | Issue                                 | Root Cause                       | Solution                                          | Status |
| --- | ------------------------------------- | -------------------------------- | ------------------------------------------------- | ------ |
| 1   | Tailwind CSS styles not displaying    | Incorrect Babel config           | Fixed babel.config.js, cleaned tailwind.config.js | ✅     |
| 2   | styled is not a function              | Deprecated NativeWind v2 pattern | Removed styled() wrapper, used className directly | ✅     |
| 3   | Metro bundler cache issues            | Stale cache                      | Clear cache with -c flag, reinstall dependencies  | ✅     |
| 4   | Invalid token in expo-router/entry.js | Corrupted babel config           | Cleaned babel config file                         | ✅     |
| 5   | Metro config load failure             | Incorrect withNativeWind() usage | Removed Metro wrapper, use Babel only             | ✅     |
| 6   | Reanimated module crash               | Version mismatch                 | Removed animations temporarily                    | ✅     |
| 7   | LinkingContext error                  | Route conflict, missing Provider | Renamed route, added SafeAreaProvider             | ✅     |
| 8   | Navbar alignment                      | Styling issues                   | Fixed tab bar styles                              | ✅     |
| 9   | Start screen visibility               | Android SafeAreaView issues      | Replaced with View and padding                    | ✅     |
| 10  | Navigation mounting error             | Auto-redirect before mount       | Removed auto-redirect, manual button nav          | ✅     |
| 11  | Map not loading                       | PROVIDER_GOOGLE needing keys     | Use default OS provider, inline styles            | ✅     |
| 12  | File corruption                       | Interrupted write                | Recreated file                                    | ✅     |

---

## Configuration Files

### package.json (Final)

```json
{
  "name": "airport",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/vector-icons": "15.0.3",
    "@react-navigation/bottom-tabs": "7.5.0",
    "@react-navigation/elements": "2.6.3",
    "@react-navigation/native": "7.1.18",
    "expo": "~54.0.19",
    "expo-constants": "~18.0.2",
    "expo-linear-gradient": "~14.0.1",
    "expo-linking": "~7.0.3",
    "expo-router": "~6.0.15",
    "expo-status-bar": "~2.2.0",
    "nativewind": "4.2.1",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-native": "0.81.5",
    "react-native-css-interop": "^0.2.1",
    "react-native-maps": "latest",
    "react-native-reanimated": "~4.1.1",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.4.0"
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "babel-preset-expo": "54.0.6",
    "eslint": "9.25.0",
    "tailwindcss": "3.4.18",
    "typescript": "~5.9.2"
  }
}
```

### babel.config.js

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

### metro.config.js

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
module.exports = config;
```

### tailwind.config.js (Final)

```javascript
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2a658a", // Navy Blue
        secondary: "#518494", // Cyan
        accent: "#4d8e7b", // Teal
        success: "#04a51b", // Green
        warning: "#ef6c1a", // Orange
        sky: "#87CEEB", // Sky Blue
        "sky-light": "#E0F4FF", // Light Blue
        "sky-dark": "#4A90B8", // Dark Sky Blue
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.1)",
        floating: "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
```

### tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "jsxImportSource": "nativewind",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### nativewind-env.d.ts

```typescript
/// <reference types="nativewind/types" />
```

### global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### app.json

```json
{
  "expo": {
    "name": "Airport",
    "slug": "airport",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

---

## Running the Application

### Development

```bash
# Start development server
npm start
# or
npx expo start

# Start with cleared cache (recommended after config changes)
npx expo start -c

# Platform-specific
npx expo start --android
npx expo start --ios
npx expo start --web
```

### Troubleshooting Commands

```bash
# Clear all caches
npx expo start -c --clear

# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install --legacy-peer-deps

# Check package versions
npm ls @react-navigation/native
npm ls react

# Verify no duplicate packages
Get-ChildItem -Recurse -Directory .\node_modules | Where-Object { $_.FullName -like '*@react-navigation\native' }
```

### Building for Production (Future)

```bash
# Create development build (when animations needed)
npx expo prebuild
npx expo run:android
npx expo run:ios
```

---

## Data Layer

### Place Interface

```typescript
interface Place {
  id: number;
  name: string;
  type: string;
  floor: string;
  description: string;
  distance?: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
```

### Sample Data Structure

```javascript
{
  id: 1,
  name: "ATM - Bank of Ceylon",
  type: "ATM",
  floor: "Ground Floor",
  description: "24/7 cash withdrawal service",
  coordinates: { latitude: 7.1807, longitude: 79.8842 },
  distance: 150
}
```

**Key Functions:**

- `AIRPORT_CENTER`: Starting point coordinates
- `getRoutePolyline(destination)`: Generates dummy path from center to destination
- `getDirections(place)`: Generates context-aware step-by-step instructions

---

## Future Roadmap

**High Priority**

- [ ] Real Data Integration: Connect Flights screen to live flight API
- [ ] Indoor Positioning: Integrate real indoor mapping provider
- [ ] User Location: GPS integration for "You are here"
- [ ] Multi-floor Support: Handle different terminal levels
- [ ] Real Pathfinding: Implement A\* or Dijkstra algorithm

**Medium Priority**

- [ ] Re-enable Animations: Switch to development build for react-native-reanimated
- [ ] Offline Support: Cache maps and data locally
- [ ] Push Notifications: Flight updates and gate changes
- [ ] Accessibility: Voice guidance, high contrast mode
- [ ] User Profiles: Save favorite locations and preferences

**Low Priority**

- [ ] Image Caching: Store Unsplash images locally
- [ ] Unit Tests: Add comprehensive test coverage
- [ ] CI/CD Pipeline: Automated build and deployment
- [ ] Environment Configuration: .env file setup
- [ ] Error Boundaries: Proper error handling throughout app

---

## Best Practices Established

**Development Workflow:**

- Always clear cache when changing configuration files
- Pin critical dependencies to exact versions
- Use path aliases (@/) for cleaner imports
- Test on both platforms (iOS and Android) regularly
- Document all issues and solutions immediately

**Code Organization:**

- File-based routing with expo-router
- Component reusability (PlaceCard, CategoryCard)
- Centralized data layer (places.ts)
- Consistent styling with Tailwind classes
- Type safety with TypeScript interfaces

**Navigation:**

- Avoid auto-redirect on mount - use manual navigation
- Use `router.push()` instead of `router.replace()` during initialization
- Use leading slash for group routes: `/(tabs)/dashboard`

---

## TypeScript Interfaces & Types

### Core Types

```typescript
// Place/Location
interface Place {
  id: number;
  name: string;
  type:
    | "ATM"
    | "Cashier"
    | "Shop"
    | "Gate"
    | "Lounge"
    | "Restroom"
    | "Restaurant"
    | "Medical"
    | "Help Desk";
  floor: string;
  description: string;
  distance?: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Route
interface Route {
  distance: number;
  duration: number;
  polyline: Array<{ latitude: number; longitude: number }>;
}

// Direction Step
interface DirectionStep {
  instruction: string;
  distance: string;
  icon: string;
}

// Category
interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}
```

---

## Styling Guidelines

### Tailwind Class Usage

**Common Patterns**

```typescript
// Containers
className = "flex-1 bg-white";
className = "p-4 rounded-xl shadow-lg";

// Buttons
className = "bg-primary px-6 py-3 rounded-xl";
className = "bg-secondary rounded-full p-4";

// Text
className = "text-2xl font-bold text-primary";
className = "text-sm text-gray-500";

// Cards
className = "bg-white rounded-2xl p-4 shadow-md";
className = "border border-gray-200 rounded-lg";

// Layout
className = "flex-row items-center justify-between";
className = "absolute bottom-0 left-0 right-0";
```

**Color Classes**

```typescript
// Backgrounds
bg - primary; // #2a658a (Navy Blue)
bg - secondary; // #518494 (Cyan)
bg - accent; // #4d8e7b (Teal)
bg - sky; // #87CEEB (Sky Blue)
bg - sky - light; // #E0F4FF (Light Blue)
bg - sky - dark; // #4A90B8 (Dark Sky Blue)
bg - success; // #04a51b (Green)
bg - warning; // #ef6c1a (Orange)

// Text Colors
text - primary;
text - secondary;
text - accent;
text - gray - 500;
text - gray - 700;
text - white;
```

**Spacing**

```typescript
// Padding
p - 2; // 8px
p - 4; // 16px
p - 6; // 24px
px - 4; // horizontal 16px
py - 2; // vertical 8px

// Margin
m - 2; // 8px
m - 4; // 16px
mb - 4; // margin-bottom 16px
mt - 6; // margin-top 24px

// Gap (for flex)
gap - 2; // 8px
gap - 4; // 16px
```

---

## Component Patterns

### CategoryCard Component

```typescript
interface CategoryCardProps {
  name: string;
  icon: string;
  color: string;
  count: number;
  onPress: () => void;
}

// Usage
<CategoryCard
  name="ATMs"
  icon="cash"
  color="secondary"
  count={3}
  onPress={() => router.push("/search?category=ATM")}
/>;
```

### PlaceCard Component

```typescript
interface PlaceCardProps {
  place: Place;
  onPress: () => void;
}

// Usage
<PlaceCard
  place={placeObject}
  onPress={() => router.push(`/map-preview?id=${place.id}`)}
/>;
```

### MapView with Marker

```typescript
import MapView, { Marker, Polyline } from "react-native-maps";

<MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: 7.1807,
    longitude: 79.884,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }}
>
  <Marker
    coordinate={place.coordinates}
    title={place.name}
    description={place.description}
  />
  <Polyline
    coordinates={routePolyline}
    strokeColor="#2a658a"
    strokeWidth={3}
    lineDashPattern={[5, 5]}
  />
</MapView>;
```

---

## Navigation Patterns

### Router Usage

```typescript
import { useRouter, useLocalSearchParams } from "expo-router";

// Navigation
const router = useRouter();
router.push("/map-preview");
router.push(`/map-preview?id=${placeId}`);
router.back();

// Reading Parameters
const { id } = useLocalSearchParams();
const placeId = Array.isArray(id) ? id[0] : id;
```

### Screen Options

```typescript
// In _layout.tsx
<Stack.Screen
  name="map-preview"
  options={{
    headerShown: false,
    presentation: "card",
    animation: "slide_from_right",
  }}
/>
```

---

## Testing Checklist

### Manual Testing

- [ ] Start screen loads and displays correctly
- [ ] "Get Started" button navigates to dashboard
- [ ] Dashboard displays all sections (Hero, Search, Quick Actions, Featured)
- [ ] Bottom tabs switch correctly (Dashboard, Services, Flights)
- [ ] Search functionality filters results in real-time
- [ ] Category filters work correctly
- [ ] Tapping a place card navigates to map preview
- [ ] Map displays with correct marker
- [ ] "Let's Go" button navigates to route navigation
- [ ] Route polyline displays on map
- [ ] Step-by-step directions display correctly
- [ ] Back buttons work on all screens
- [ ] App handles missing data gracefully
- [ ] No console errors or warnings

### Platform-Specific Testing

**iOS**

- [ ] Safe area insets respected
- [ ] Tab bar displays correctly
- [ ] Animations smooth
- [ ] Map gestures work

**Android**

- [ ] Status bar color correct
- [ ] Back button behavior correct
- [ ] Tab bar displays correctly
- [ ] Map gestures work

---

## Performance, Security & Accessibility

### Performance Optimization

**Implemented:**

1.  FlatList for long lists instead of ScrollView with map()
2.  Memoized components using React.memo
3.  useCallback for event handlers
4.  Lazy imports for heavy components
5.  Image optimization

**Future:**

- [ ] Implement React.lazy for code splitting
- [ ] Virtual scrolling for very long lists
- [ ] Optimize map rendering with clustering
- [ ] Implement image caching strategy

### Security Considerations

**Current:**

- No API keys stored in code (using default map provider)
- No sensitive user data collection
- No authentication required

**Future:**

- [ ] Implement secure storage for API keys
- [ ] Add user authentication (OAuth)
- [ ] Encrypt cached data

### Accessibility

**Current:**

- Proper text contrast ratios
- TouchableOpacity with activeOpacity for feedback
- Semantic component usage

**Future:**

- [ ] Add accessibility labels to all interactive elements
- [ ] Implement screen reader support
- [ ] Support dynamic type sizes
- [ ] Add voice navigation option

---

## Deployment & Maintenance

### Known Limitations

**Expo Go Constraints:**

- React Native Reanimated animations disabled (requires custom build)
- Limited native module support
- Cannot use PROVIDER_GOOGLE for maps without API keys

**Data Limitations:**

- Using dummy/mock data
- Static coordinates
- Simplified pathfinding

### Environment Variables (Future)

**Recommended `.env` Structure**

```bash
# API Keys
GOOGLE_MAPS_API_KEY=your_key_here
FLIGHT_API_KEY=your_key_here
# Backend URLs
API_BASE_URL=[https://api.yourbackend.com](https://api.yourbackend.com)
```

### Team Collaboration - Git Workflow

```bash
# Feature branch
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

### Maintenance

- Update Expo SDK every 2-3 months
- Update dependencies monthly
- Review security vulnerabilities
- Monitor crash reports

---

## Appendix & History

### Quick Command Reference

```bash
# Development
npm start                          # Start dev server
npx expo start -c                  # Start with cache cleared
npx expo start --android           # Open on Android
npx expo start --ios               # Open on iOS

# Troubleshooting
rm -rf node_modules package-lock.json  # Clean dependencies
npm install --legacy-peer-deps     # Reinstall
npx expo doctor                    # Check setup
npm ls <package>                   # Check package version

# Building
npx expo prebuild                  # Generate native code
npx expo run:android               # Run on Android
npx expo run:ios                   # Run on iOS
eas build --platform android       # Build with EAS
```

### File Size & Benchmarks

- **Total App Size:** \~50MB (development), \~20-30MB (production)
- **Cold Start Time:** \~2-3 seconds
- **Map Load Time:** \~1-2 seconds

### Document History

| Version | Date         | Changes                                   | Author           |
| ------- | ------------ | ----------------------------------------- | ---------------- |
| 1.0     | Nov 21, 2025 | Initial project setup, Red/Black theme    | Development Team |
| 1.1     | Nov 21, 2025 | Multi-color theme, search features        | Development Team |
| 1.2     | Nov 23, 2025 | SriLankan Airlines theme, tab navigation  | Development Team |
| 1.3     | Nov 23, 2025 | Sky-Blue theme, maps integration          | Development Team |
| 2.0     | Nov 23, 2025 | Comprehensive documentation consolidation | Development Team |

---

## Contact & Support

For questions, issues, or contributions:

- Create an issue in the project repository
- Contact the development team
- Refer to inline code comments

**Last Updated:** November 23, 2025
**Project Status:** Development - Stable ✅
**Expo SDK Version:** 54.0.19
**React Native Version:** 0.81.5
**Current Theme:** Sky-Blue (Phase 4)

---

_End of Documentation_
_End of Documentation_
