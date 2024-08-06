// Interface for individual activity details
interface Activity {
    ticketPrice: string;
    placeDetails: string;
    placeImageUrl: string;
    placeName: string;
    bestTime: string; // Morning | Afternoon |
    geoCoordinates: string;

  }
  
  // Interface for hotel options
  interface HotelOption {
    hotelName: string;
    address: string;
    price: string;
    description: string;
    rating: number;
  }
  
  // Interface for flight details
  interface FlightDetails {
    departureDate: string;
    price: string;
    flightNumber: string;
    arrivalTime: string;
    airline: string;
    bookingUrl: string;
    departureTime: string;
    arrivalDate: string;
    
  }
  
  // Interface for an itinerary day
  interface ItineraryDay {
    day: string;
    activities: Activity[];
  }
  
  // Interface for the main plan
  interface Plan {
    travelDate: string;
    travelers: number;
    returnDate: string;
    itinerary: ItineraryDay[];
    hotel: HotelOption[];
    budget: string;
    goingFlight: FlightDetails;
    returnFlight: FlightDetails;
  }
  
  // Main interface for the travel data
   interface TravelData {
    plan: Plan;
    travelerType: string;
    destination: string;
    location: string;
  }
  