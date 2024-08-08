// Interface for individual activity details
interface Activity {
  ticketPrice: number;
  placeDetails: string;
  placeImageUrl?: string;
  placeName: string;
  address: string;
  duration?: string
  geoCoordinates:string;
  bestTime: string; // Morning | Afternoon | evening | daytime
  placeID?:string;
}

// Interface for hotel options
interface HotelOption {
  hotelName: string;
  hotelImageURL?: string;
  address: string;
  price: number;
  rating: number;
  amenity:any;
  hotelID?:string;
}

// Interface for flight details
interface FlightDetails {
  departureDate: string;
  price: number;
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
  source: string;
}


const MockData: TravelData = {
  "plan": {
    "travelDate": "2024-08-20",
    "travelers": 4,
    "returnDate": "2024-08-23",
    "itinerary": [
      {
        "day": "2024-08-20",
        "activities": [
          {
            "ticketPrice": 0,
            "placeDetails": "A bustling city with French colonial architecture, vibrant street food, and bustling markets.",
            "placeName": "Ho Chi Minh City",
            "address": "Ho Chi Minh City, Vietnam",
            "duration": "Full Day",
            "bestTime": "Daytime",
            "geoCoordinates": "10.7626, 106.6602"
          },
          {
            "ticketPrice": 100000,
            "placeDetails": "A historic landmark, a reminder of the Vietnam War.",
            "placeName": "War Remnants Museum",
            "address": "28 Vo Van Tan, Ward 6, District 3, Ho Chi Minh City, Vietnam",
            "duration": "3 hours",
            "bestTime": "Morning",
            "geoCoordinates": "10.7722, 106.6975"
          },
          {
            "ticketPrice": 200000,
            "placeDetails": "A beautiful park with a lake, gardens, and a pagoda.",
            "placeName": "Tao Dan Park",
            "address": "Nguyen Du St, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam",
            "duration": "2 hours",
            "bestTime": "Afternoon",
            "geoCoordinates": "10.7764, 106.6998"
          }
        ]
      },
      {
        "day": "2024-08-21",
        "activities": [
          {
            "ticketPrice": 150000,
            "placeDetails": "A stunning bay with limestone islands, caves, and beaches.",
            "placeName": "Ha Long Bay",
            "address": "Ha Long Bay, Quang Ninh Province, Vietnam",
            "duration": "Full Day",
            "bestTime": "Daytime",
            "geoCoordinates": "20.9499, 107.0748"
          }
        ]
      },
      {
        "day": "2024-08-22",
        "activities": [
          {
            "ticketPrice": 0,
            "placeDetails": "The ancient capital of Vietnam, with a rich history and culture.",
            "placeName": "Hanoi",
            "address": "Hanoi, Vietnam",
            "duration": "Full Day",
            "bestTime": "Daytime",
            "geoCoordinates": "21.0244, 105.8412"
          },
          {
            "ticketPrice": 50000,
            "placeDetails": "A beautiful lake in the heart of Hanoi, with a temple and a pagoda.",
            "placeName": "Hoan Kiem Lake",
            "address": "Hoan Kiem District, Hanoi, Vietnam",
            "duration": "2 hours",
            "bestTime": "Morning",
            "geoCoordinates": "21.0208, 105.8461"
          },
          {
            "ticketPrice": 100000,
            "placeDetails": "A complex of temples and pagodas, a UNESCO World Heritage Site.",
            "placeName": "Ha Long Bay",
            "address": "Ha Long Bay, Quang Ninh Province, Vietnam",
            "duration": "3 hours",
            "bestTime": "Afternoon",
            "geoCoordinates": "20.9499, 107.0748"
          }
        ]
      },
      {
        "day": "2024-08-23",
        "activities": [
          {
            "ticketPrice": 0,
            "placeDetails": "A charming town with a French colonial past, beautiful beaches, and a laid-back atmosphere.",
            "placeName": "Hoi An",
            "address": "Hoi An, Quang Nam Province, Vietnam",
            "duration": "Full Day",
            "bestTime": "Daytime",
            "geoCoordinates": "16.1441, 108.2202"
          },
          {
            "ticketPrice": 20000,
            "placeDetails": "A Japanese covered bridge, a symbol of Hoi An.",
            "placeName": "Japanese Covered Bridge",
            "address": "Tran Phu St, Cam Pho Ward, Hoi An, Quang Nam Province, Vietnam",
            "duration": "1 hour",
            "bestTime": "Morning",
            "geoCoordinates": "16.1442, 108.2211"
          },
          {
            "ticketPrice": 30000,
            "placeDetails": "A bustling market with traditional crafts, souvenirs, and street food.",
            "placeName": "Hoi An Ancient Town",
            "address": "Hoi An, Quang Nam Province, Vietnam",
            "duration": "3 hours",
            "bestTime": "Afternoon",
            "geoCoordinates": "16.1441, 108.2202"
          }
        ]
      }
    ],
    "hotel": [
      {
        "hotelName": "The Reverie Saigon",
        "address": "22-36 Nguyen Hue Blvd, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam",
        "price": 20000,
        "rating": 4.8,
        "amenity": [
          "Outdoor Pool",
          "Spa",
          "Fitness Center",
          "Fine Dining Restaurants",
          "Bar"
        ]
      },
      {
        "hotelName": "InterContinental Hanoi Landmark72",
        "address": "Landmark 72, Keangnam Hanoi Landmark Tower, E1, Pham Hung, My Dinh 2, Tu Liem District, Hanoi, Vietnam",
        "price": 18000,
        "rating": 4.7,
        "amenity": [
          "Indoor Pool",
          "Spa",
          "Fitness Center",
          "Fine Dining Restaurants",
          "Bar"
        ]
      }
    ],
    "budget": "Luxury",
    "goingFlight": {
      "departureDate": "2024-08-20",
      "price": 75000,
      "flightNumber": "VN300",
      "arrivalTime": "15:00",
      "airline": "Vietnam Airlines",
      "bookingUrl": "https://www.vietnamairlines.com/",
      "departureTime": "10:00",
      "arrivalDate": "2024-08-20"
    },
    "returnFlight": {
      "departureDate": "2024-08-23",
      "price": 75000,
      "flightNumber": "VN301",
      "arrivalTime": "10:00",
      "airline": "Vietnam Airlines",
      "bookingUrl": "https://www.vietnamairlines.com/",
      "departureTime": "15:00",
      "arrivalDate": "2024-08-24"
    }
  },
  "travelerType": "Friends",
  "destination": "Vietnam",
  "source": "Kolkata"
}
