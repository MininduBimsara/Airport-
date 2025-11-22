# Airport Navigation App - Quick Reference

## 📁 Complete File Structure

```
Airport-/
├── app/
│   ├── _layout.tsx              # Root navigation layout
│   ├── index.tsx                # Home screen with map view
│   ├── search.tsx               # NEW: Search & Navigate screen
│   └── route-preview.tsx        # NEW: Route preview with directions
│
├── components/
│   ├── PlaceCard.tsx            # NEW: Reusable place card component
│   ├── MapView.tsx              # Existing map component
│   ├── SearchBar.tsx            # Existing search bar
│   └── ...other components
│
├── data/
│   ├── places.ts                # NEW: 15 locations + directions logic
│   └── dummyLocations.ts        # Existing dummy data
│
├── tailwind.config.js           # UPDATED: New color scheme
└── package.json

```

## 🎨 Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary (Red) | `#dc141b` | CTAs, Gates, Medical |
| Secondary (Green) | `#04a51b` | ATMs, Restaurants |
| Accent (Orange) | `#ef6c1a` | Cashiers, Shops |
| Teal | `#4d8e7b` | Lounges |
| Navy Blue | `#2a658a` | Help Desks |
| Cyan | `#518494` | Restrooms |

## 📊 Dummy Data Summary

**15 Total Locations:**
- 3 ATMs
- 2 Cashiers
- 1 Help Desk
- 2 Gates
- 2 Lounges
- 2 Restrooms
- 1 Shop
- 1 Restaurant
- 1 Medical

## 🚀 Running the App

```bash
# Install dependencies (if needed)
npm install

# Start the development server
npm start

# Or use Expo CLI directly
npx expo start
```

## 📱 Screen Flow

```
Home (index.tsx)
    ↓
    [Tap "Search & Navigate" button]
    ↓
Search Screen (search.tsx)
    ↓
    [Tap any place card]
    ↓
Route Preview (route-preview.tsx)
    ↓
    [Tap "Start Navigation" or back button]
    ↓
Back to Search Screen
```

## 🔧 Key Components

### PlaceCard
```tsx
<PlaceCard 
  place={placeObject} 
  onPress={() => handleNavigation()} 
/>
```

### Search Screen Features
- Real-time search
- Category filters (10 categories)
- Distance sorting
- Results counter
- Empty state

### Route Preview Features
- Destination info card
- Floor, distance, time display
- Step-by-step directions
- Visual timeline
- Color-coded by type

## 📝 TypeScript Interfaces

```typescript
interface Place {
  id: number;
  name: string;
  type: string;
  floor: string;
  description: string;
  distance?: number;
}
```

## 🎯 Tailwind Classes Used

- `bg-white` - White background
- `bg-primary` - Red (#dc141b)
- `bg-secondary` - Green (#04a51b)
- `bg-accent` - Orange (#ef6c1a)
- `bg-teal` - Teal (#4d8e7b)
- `bg-navy` - Navy Blue (#2a658a)
- `bg-cyan` - Cyan (#518494)

## ✅ Checklist

- [x] White background throughout
- [x] 6 custom colors integrated
- [x] Search functionality
- [x] Category filters
- [x] Distance sorting
- [x] 15 dummy locations
- [x] Step-by-step directions
- [x] Reusable components
- [x] Expo Router navigation
- [x] TypeScript types
- [x] Production-ready code
