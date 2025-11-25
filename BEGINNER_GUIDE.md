# Airport App - Beginner's Guide & Walkthrough

## 1. The Application Walkthrough (Start Here)

This section traces exactly what happens when you open the app, step-by-step. Follow along in your code editor!

### **Step 1: The App Launches**

**File:** `app/_layout.tsx`

When you tap the app icon, Expo looks for `_layout.tsx`. This is the **Root** of your app.

- **What it does:** It sets up the "Stack" navigator (like a deck of cards).
- **Key Code:**
  ```tsx
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" />{" "}
    {/* Tells the app: "We have a Start Screen" */}
  </Stack>
  ```
- **Result:** The app loads the first screen, which is always `index`.

### **Step 2: The Start Screen Appears**

**File:** `app/index.tsx`

This is the first thing the user sees.

- **What it does:** Displays the "Airport Navigator" text and a "GET STARTED" button.
- **Key Code:**
  ```tsx
  export default function StartScreen() {
    const router = useRouter(); // 1. Get the navigation tool

    return (
      <SafeAreaView>
        <Text>Airport Navigator</Text>

        {/* 2. The Button */}
        <TouchableOpacity onPress={() => router.push("/(tabs)/dashboard")}>
          <Text>GET STARTED</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  ```
- **User Action:** The user taps "GET STARTED".

### **Step 3: The Navigation Happens**

**Concept:** Routing

The code `router.push("/(tabs)/dashboard")` tells the app to change the screen.

- **`/`**: Go to the root.
- **`(tabs)`**: Enter the "tabs" group folder.
- **`dashboard`**: Load the `dashboard.tsx` file.

### **Step 4: The Dashboard Loads**

**File:** `app/(tabs)/dashboard.tsx`

Now the user is on the main screen.

- **What it does:** Shows the "Welcome back, Traveler" text, a search bar, and quick action buttons.
- **Key Code:**
  ```tsx
  export default function DashboardScreen() {
    const [searchQuery, setSearchQuery] = useState(""); // Setup memory for typing

    return (
      <View>
         <Text>Welcome back, Traveler</Text>
         <TextInput value={searchQuery} ... /> {/* The Search Bar */}
      </View>
    );
  }
  ```

---

## 2. Deep Dive: Understanding the Syntax

Now that you know the _flow_, let's understand the _grammar_.

### **A. The "Import" Section**

At the top of every file, you see this:

```tsx
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
```

- **Analogy:** This is like packing your backpack before school. You are grabbing the tools (`View`, `Text`) you need for this specific file.

### **B. The Component Function**

```tsx
export default function MyScreen() { ... }
```

- **Analogy:** This is the recipe. `MyScreen` is the name of the dish. `export default` means "serve this dish when someone asks for this file".

### **C. JSX (The HTML-looking stuff)**

It looks like HTML, but it's stricter.

- **`<View>`**: The Box. Used for layout.
- **`<Text>`**: The Words. ALL text must be inside this tag.
- **`className="..."`**: The Styling. We use **NativeWind** (Tailwind CSS).
  - `flex-1`: Expand to fill space.
  - `bg-white`: Make background white.
  - `p-4`: Add padding (space inside the box).

### **D. Hooks (The `use...` things)**

Special tools that give your component powers.

- **`useRouter()`**: Gives you the power to change screens.
- **`useState()`**: Gives your component "memory".
  - `const [name, setName] = useState("John");`
  - `name` is the current value ("John").
  - `setName` is the function to change it (`setName("Sarah")`).

---

## 3. Detailed File Reference (What each file does and where errors usually come from)

Below is a list of the most important files and a line-by-line explanation of the parts you will see in them. When an error occurs, the stack trace will often point to one of these files — this section tells you what to look for.

- `app/_layout.tsx` — Root layout

  - Purpose: This file defines the app's top-level navigator and any providers (context) you need across the app.
  - What to look for: `SafeAreaProvider`, `<Stack>` or `<Tabs>` definitions, and imported providers. Errors that say "Couldn't find a LinkingContext" or similar often mean the navigation provider is missing or duplicated.

  Example snippet:

  ```tsx
  import { Stack } from "expo-router";
  import { SafeAreaProvider } from "react-native-safe-area-context";

  export default function RootLayout() {
    return (
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          {/* other screens */}
        </Stack>
      </SafeAreaProvider>
    );
  }
  ```

  Common errors:

  - Missing `SafeAreaProvider` — causes SafeAreaView warnings or layout issues.
  - Declaring tab navigator incorrectly (causes LinkingContext errors when BottomTabBar mounts without navigation context).

- `app/index.tsx` — Start screen (landing)

  - Purpose: Entry point UI. Contains the Get Started button that navigates into the main app.
  - What to look for: `useRouter()`, `router.push()` or `router.replace()`. If an automatic redirect runs on mount (`useEffect` with `router.replace`) it may cause navigation before the root providers mount.

  Common errors:

  - Using `router.replace()` too early causes "Couldn't find a LinkingContext" because the tab navigator tries to render before the container is ready.
  - Fix: Use manual navigation (button with `router.push('/(tabs)/dashboard')`) or delay navigation with `InteractionManager.runAfterInteractions()`.

- `app/(tabs)/_layout.tsx` and files inside `(tabs)`

  - Purpose: Defines the bottom tab structure (`<Tabs>`) and each tab's screen.
  - What to look for: `Tabs` from `expo-router` with `Tabs.Screen` entries. Tab bar icons and options live here.

  Common errors:

  - If you see `BottomTabBar` stack frames in an error, the tabs are involved — check the `Tabs` declaration and ensure it's rendered inside the proper router context.

- `app/search.tsx`, `app/route-preview.tsx`, `app/map-preview.tsx`, `app/route-navigation.tsx`

  - Purpose: These are feature screens that use maps, markers, and UI. They commonly import `SafeAreaView`, `MapView`, `Ionicons`, etc.
  - What to look for: imports from `react-native-maps` or `react-native-safe-area-context`. If a screen crashes on mount, check for undefined props or invalid params passed via `useLocalSearchParams()`.

- `components/BottomNavbar.tsx` and other components

  - Purpose: Reusable UI. They should be pure (receive props, render UI) and avoid calling navigation-level hooks unless intentionally.
  - What to look for: If a component uses navigation hooks (`useRouter()`, `usePathname()`), ensure it's mounted inside a screen that is already under navigation context.

- `package.json`, `node_modules/`
  - Purpose: `package.json` lists dependencies and versions. `node_modules` contains installed packages.
  - If installing fails with `ERESOLVE`: a peer dependency conflict. Use `npm install --legacy-peer-deps` to replicate earlier NPM behavior or align versions.

## 4. React & JSX — Line-by-line explanation

This section explains the common patterns you'll see in each file. I'll use short examples and explain every part.

### Imports

Example:

```tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
```

- `import React from 'react'` — brings React into scope. Required for JSX to work in older setups; with newer tooling it's sometimes optional but safe to include.
- `{ View, Text }` — these are named exports from `react-native` used for UI layout and text.
- `useRouter` — a hook from `expo-router` that gives navigation utilities.

### Component function

Example:

```tsx
export default function StartScreen() {
  const router = useRouter();
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}
```

- `export default` — this file exports the component as the default export. When another file does `import StartScreen from './index'` it receives this function.
- `function StartScreen(){ ... }` — a React component is just a function that returns JSX.

### JSX explained

JSX looks like HTML but it's JavaScript. Example:

```tsx
<TouchableOpacity onPress={() => router.push("/(tabs)/dashboard")}>
  <Text>GET STARTED</Text>
</TouchableOpacity>
```

- `<TouchableOpacity>`: a pressable UI element.
- `onPress={() => ...}`: handler executed when pressed. We pass a function; don't call it immediately.
- `{ ... }` inside JSX is JavaScript expression interpolation — use it to insert variables or call functions.

### Props

Props are the inputs to components:

```tsx
<MyButton label="Save" disabled={true} />
```

Inside `MyButton`:

```tsx
function MyButton({ label, disabled }) {
  return <Text>{label}</Text>;
}
```

### State and Hooks

`useState` example:

```tsx
const [count, setCount] = useState(0);
// setCount(count + 1) will change state and re-render the component
```

`useEffect` example (side-effects and lifecycle):

```tsx
useEffect(() => {
  // runs after first render (componentDidMount)
  const t = setTimeout(() => doSomething(), 1000);
  return () => clearTimeout(t); // cleanup on unmount
}, []); // empty deps -> run only once on mount
```

`useLocalSearchParams()` from `expo-router` reads URL/query params passed when navigating.

## 5. Debugging: Reading error messages and locating the file

When an error occurs in React Native, you'll see a red screen (in Dev) and a stack trace. The stack shows file paths and functions. Example from your earlier error:

```
ERROR  [Error: Couldn't find a LinkingContext context.]
  React.createContext$argument_0.get__options (node_modules\\@react-navigation\\native\\lib\\module\\LinkingContext.js)
  useLinkBuilder (node_modules\\@react-navigation\\native\\lib\\module\\useLinkBuilder.js)
  BottomTabBar (node_modules\\@react-navigation\\bottom-tabs\\lib\\module\\views\\BottomTabBar.js)
  TabLayout (app\\(tabs)\\_layout.tsx)
  RootLayout (app\\_layout.tsx)
```

How to interpret and act:

- Look from top to bottom — the first lines are deep inside libraries, the latter lines reference your app files.
- `TabLayout (app\\(tabs)\\_layout.tsx)` tells you the app file where the final render happened — open that file.
- Check that the root provider is present in `app/_layout.tsx` (e.g., `SafeAreaProvider`) and that you did not accidentally import a second copy of `@react-navigation/*`.

Quick search commands (PowerShell):

```powershell
# Find which file contains a symbol
Select-String -Path .\\**\\*.tsx -Pattern "LinkingContext" -SimpleMatch

# Search for router.replace usage which can cause early navigation
Select-String -Path .\\**\\*.tsx -Pattern "router.replace" -SimpleMatch
```

## 6. Common issues and fixes (summary)

- "Couldn't find a LinkingContext context." — Root cause: conflicting/mismatched React Navigation versions, or navigation mounting before provider. Fixes:

  - Ensure `app/_layout.tsx` wraps with correct providers.
  - Avoid redirecting with `router.replace()` on mount; prefer manual `router.push()` or use `InteractionManager.runAfterInteractions()`.
  - Reinstall with `npm install --legacy-peer-deps` if dependency resolution fails.

- SafeAreaView deprecation warning — Fix: import `SafeAreaView` from `react-native-safe-area-context` and wrap root with `SafeAreaProvider`.

- Metro cache / bundler stale modules — Fix: `npx expo start --clear` and sometimes delete `node_modules` + `package-lock.json` then reinstall.

## 7. Useful commands (copyable)

```powershell
# Clean and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install --legacy-peer-deps

# Start with cleared cache
npx expo start --clear

# Search for text in project
Select-String -Path .\\**\\*.tsx -Pattern "router.replace" -SimpleMatch

# Show installed versions of navigation packages
npm ls @react-navigation/native @react-navigation/bottom-tabs expo-router
```

## 8. How to fix a runtime error step-by-step (example workflow)

1. Read the red screen stack trace and note the last `app/...` file referenced.
2. Open that file and inspect imports, hooks, and any `useEffect` hooks that run navigation.
3. If navigation hooks are called during mount, comment them out or delay them to confirm the cause.
4. Check `app/_layout.tsx` for providers like `SafeAreaProvider` or any accidental double providers.
5. Run `npm ls @react-navigation/native` to ensure a single version is installed.
6. Clear Metro cache and relaunch.

## 9. Learning resources and next steps

- React Native docs: https://reactnative.dev/docs/getting-started
- Expo docs: https://docs.expo.dev/
- Expo Router: https://docs.expo.dev/router/
- React Navigation: https://reactnavigation.org/

---

If you'd like, I can now:

- Expand this file further to include annotated copies of specific files (line-by-line comments inside code blocks), or
- Create a small diagnostic script that checks installed versions and flags duplicates in `node_modules`.

## Which would you prefer next? (I can apply the change automatically.)

## 3. Project Structure Reference

- **`app/`**: **YOUR SCREENS LIVE HERE.**
  - `_layout.tsx`: The main setup file.
  - `index.tsx`: The start screen.
  - `(tabs)/`: The folder for your main app tabs (Dashboard, Flights, etc.).
- **`components/`**: Reusable pieces (like a custom card or button).
- **`assets/`**: Images and fonts.

---

## 4. Troubleshooting Guide

**Problem: "I see a Red Screen!"**

1.  **Read the top line.** It usually says exactly what is wrong.
2.  **Check Imports:** Did you use `<View>` but forget to `import { View } from 'react-native'`?
3.  **Check Syntax:** Did you close all your tags? `<View> ... </View>`

**Problem: "My button doesn't work!"**

1.  Check `onPress`. Does it look like `onPress={() => ...}`?
2.  Check the route. Does the file exist? `router.push("/nowhere")` will fail if `nowhere.tsx` doesn't exist.

**Problem: "The screen is blank!"**

1.  Did you `return` anything? Every component must `return (...)`.
2.  Is the text white on a white background? Try adding `className="bg-red-500"` to see if the View is there.
