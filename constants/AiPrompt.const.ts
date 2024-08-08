export const AI_PROMPT=`Generate Travel Plan from {source} to {destination}.
Travel date - {startDate} to  {endDate}. Traveler details - {travelWith} , total number of person {numberOfPerson} , with a {budget} budget .
Create a Json that includes travel mode as flight or train. travel mode details ( flight Price with Booking url,cost in INR, date , time ) share round trip details .
 Hotel options , with details - hotelName , address , price , rating , amenity .
Create a day wise plan to visit place , best time to visit , ticket price , placeName, place details , geo Coordinates , and duration(time required to visit). 
 
`