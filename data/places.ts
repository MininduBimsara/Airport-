export interface Place {
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

// BIA Airport center coordinates
export const AIRPORT_CENTER = {
  latitude: 7.1807,
  longitude: 79.8841,
};

export const PLACES: Place[] = [
  {
    id: 1,
    name: "Commercial Bank ATM",
    type: "ATM",
    floor: "Arrival Level",
    description: "Located near baggage belt 3. Available 24/7 with multi-currency support.",
    distance: 120,
    coordinates: { latitude: 7.1810, longitude: 79.8845 },
  },
  {
    id: 2,
    name: "People's Bank ATM",
    type: "ATM",
    floor: "Departure Level",
    description: "Near entrance gate 02. Accepts international cards.",
    distance: 85,
    coordinates: { latitude: 7.1815, longitude: 79.8850 },
  },
  {
    id: 3,
    name: "Sampath Bank ATM",
    type: "ATM",
    floor: "Main Lobby",
    description: "Central location near information desk. Quick access.",
    distance: 45,
    coordinates: { latitude: 7.1808, longitude: 79.8843 },
  },
  {
    id: 4,
    name: "Information Counter",
    type: "Help Desk",
    floor: "Main Lobby",
    description: "Central help desk with multilingual staff available 24/7.",
    distance: 30,
    coordinates: { latitude: 7.1807, longitude: 79.8841 },
  },
  {
    id: 5,
    name: "SriLankan Airlines Service Desk",
    type: "Cashier",
    floor: "Departure Level",
    description: "Ticketing and payment counter. Flight rebooking available.",
    distance: 150,
    coordinates: { latitude: 7.1820, longitude: 79.8855 },
  },
  {
    id: 6,
    name: "Currency Exchange - Thomas Cook",
    type: "Cashier",
    floor: "Arrival Level",
    description: "Best rates for USD, EUR, GBP. Commission-free exchange.",
    distance: 95,
    coordinates: { latitude: 7.1812, longitude: 79.8847 },
  },
  {
    id: 7,
    name: "Gate 01",
    type: "Gate",
    floor: "Departure Level",
    description: "International departures. Boarding starts 45 minutes before flight.",
    distance: 320,
    coordinates: { latitude: 7.1825, longitude: 79.8860 },
  },
  {
    id: 8,
    name: "Gate 12",
    type: "Gate",
    floor: "Departure Level",
    description: "Domestic and regional flights. Check-in counter nearby.",
    distance: 280,
    coordinates: { latitude: 7.1823, longitude: 79.8858 },
  },
  {
    id: 9,
    name: "SriLankan Airlines Lounge",
    type: "Lounge",
    floor: "Departure Level",
    description: "Premium lounge with complimentary food and beverages.",
    distance: 200,
    coordinates: { latitude: 7.1818, longitude: 79.8852 },
  },
  {
    id: 10,
    name: "Plaza Premium Lounge",
    type: "Lounge",
    floor: "Departure Level",
    description: "Pay-per-use lounge with shower facilities and WiFi.",
    distance: 215,
    coordinates: { latitude: 7.1819, longitude: 79.8853 },
  },
  {
    id: 11,
    name: "Men's Restroom - Terminal A",
    type: "Restroom",
    floor: "Departure Level",
    description: "Clean facilities with accessible stalls.",
    distance: 60,
    coordinates: { latitude: 7.1809, longitude: 79.8844 },
  },
  {
    id: 12,
    name: "Women's Restroom - Terminal A",
    type: "Restroom",
    floor: "Departure Level",
    description: "Clean facilities with baby changing station.",
    distance: 65,
    coordinates: { latitude: 7.1809, longitude: 79.8845 },
  },
  {
    id: 13,
    name: "Duty Free Shop - Main",
    type: "Shop",
    floor: "Departure Level",
    description: "Perfumes, chocolates, electronics, and local souvenirs.",
    distance: 180,
    coordinates: { latitude: 7.1816, longitude: 79.8851 },
  },
  {
    id: 14,
    name: "Food Court",
    type: "Restaurant",
    floor: "Departure Level",
    description: "Multiple dining options including local and international cuisine.",
    distance: 140,
    coordinates: { latitude: 7.1814, longitude: 79.8849 },
  },
  {
    id: 15,
    name: "Pharmacy",
    type: "Medical",
    floor: "Main Lobby",
    description: "Over-the-counter medications and first aid supplies.",
    distance: 75,
    coordinates: { latitude: 7.1811, longitude: 79.8846 },
  },
];

export const CATEGORIES = [
  { id: "all", name: "All", icon: "apps" as const, color: "#005B8F" },
  { id: "atm", name: "ATM", icon: "cash" as const, color: "#0FA3B1" },
  { id: "cashier", name: "Cashier", icon: "card" as const, color: "#3BA99C" },
  { id: "help-desk", name: "Help Desk", icon: "information-circle" as const, color: "#005B8F" },
  { id: "gate", name: "Gates", icon: "airplane" as const, color: "#66BCE8" },
  { id: "lounge", name: "Lounges", icon: "bed" as const, color: "#3BA99C" },
  { id: "restroom", name: "Restrooms", icon: "man" as const, color: "#0FA3B1" },
  { id: "shop", name: "Shops", icon: "cart" as const, color: "#66BCE8" },
  { id: "restaurant", name: "Restaurants", icon: "restaurant" as const, color: "#3BA99C" },
  { id: "medical", name: "Medical", icon: "medical" as const, color: "#3BA99C" },
];


// Generate route polyline coordinates from current location to destination
export const getRoutePolyline = (destination: Place) => {
  // Dummy route - creates a simple path from airport center to destination
  const startLat = AIRPORT_CENTER.latitude;
  const startLng = AIRPORT_CENTER.longitude;
  const endLat = destination.coordinates.latitude;
  const endLng = destination.coordinates.longitude;

  // Create intermediate points for a more realistic route
  const midLat1 = startLat + (endLat - startLat) * 0.3;
  const midLng1 = startLng + (endLng - startLng) * 0.3;
  const midLat2 = startLat + (endLat - startLat) * 0.7;
  const midLng2 = startLng + (endLng - startLng) * 0.7;

  return [
    { latitude: startLat, longitude: startLng },
    { latitude: midLat1, longitude: midLng1 },
    { latitude: midLat2, longitude: midLng2 },
    { latitude: endLat, longitude: endLng },
  ];
};

// Generate step-by-step directions based on place
export const getDirections = (place: Place): string[] => {
  const baseDirections = [
    "Start from your current location",
    `Head towards ${place.floor}`,
  ];

  // Add specific directions based on type
  if (place.type === "ATM") {
    return [
      ...baseDirections,
      "Look for the banking services signage",
      `Turn right at the ${place.floor} corridor`,
      `${place.name} will be on your left`,
    ];
  } else if (place.type === "Gate") {
    return [
      ...baseDirections,
      "Follow the departure gates signage",
      "Walk straight through the security checkpoint area",
      `${place.name} will be ahead on your right`,
    ];
  } else if (place.type === "Restroom") {
    return [
      ...baseDirections,
      "Look for the restroom symbols overhead",
      `Walk ${Math.round(place.distance! / 2)}m straight`,
      "Facilities will be on your right",
    ];
  } else if (place.type === "Lounge") {
    return [
      ...baseDirections,
      "Take the escalator to Departure Level",
      "Turn left after security",
      `Walk ${Math.round(place.distance! * 0.7)}m and look for lounge entrance on right`,
    ];
  } else {
    return [
      ...baseDirections,
      `Walk straight for ${Math.round(place.distance! * 0.6)}m`,
      `Turn left at Terminal A`,
      `${place.name} will be on your right`,
    ];
  }
};

