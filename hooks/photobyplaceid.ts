import axios from 'axios';
import base64 from 'base64-js';
import { MAPAPI } from '@/constants/API';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/configs/FirebaseConfig';
import { FIRE_REF } from '@/constants/Ref.const';
import { doc, setDoc } from 'firebase/firestore';
const API_KEY = MAPAPI;

export interface IPhotoMetadata {
  placeid: string,
  photoReference: string,
  directionURL: string,
  formatted_address: string,
  downloadURL?:any
}

export interface IHotelMetadata {
  place_id: string,
  rating: string,
  photo_reference:string,
  downloadURL?:any
}

export const fetchPlaceDetails = async (placeId:string) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        key: API_KEY,
      },
    });
    if (response?.data?.result?.photos && response.data.result.photos.length > 0) {
      const photoReference = response.data.result.photos[0].photo_reference;
      let data:IPhotoMetadata = {
        placeid: placeId,
        photoReference: photoReference,
        directionURL: response.data.result.url,
        formatted_address: response.data.result.formatted_address
      }

      return data;
    } else {
      throw new Error('No photos available for this place.');
    }
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  } 
};

// Function to fetch photo using the photo reference and convert to base64
export const fetchPlacePhotoByID = async (photoReference: string) => {
  try {
    console.log(photoReference)
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
      params: {
        maxwidth: 1200, // or any other desired size
        photoreference: photoReference,
        key: API_KEY,
      },
      responseType: 'arraybuffer',
    });

    // Convert arraybuffer to base64 string
    const base64String = base64.fromByteArray(new Uint8Array(response.data));
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    //return base64 string
    return imageUrl;
  } catch (error) {
    console.error('Error fetching place photo:', error);
    throw error;
  }
};

export const savePhotoMetadata = async (data:IPhotoMetadata) => {
  try {

    const docRef = doc(db, FIRE_REF.PLACE_PHOTO_STORAGE, data.placeid);
    await setDoc(docRef, {
      ...data
    });

    console.log('Photo metadata saved successfully.');
  } catch (error) {
    console.error('Error saving photo metadata:', error);
    throw error;
  }
};

export const savePhotoMetadataH = async (data:IHotelMetadata) => {
  try {

    const docRef = doc(db, FIRE_REF.HOTEL_PHOTO_STORAGE, data.place_id);
    await setDoc(docRef, {
      ...data
    });

    console.log('Photo metadata saved successfully.');
  } catch (error) {
    console.error('Error saving photo metadata:', error);
    throw error;
  }
};


export const placeDetailsBySearch = async (placename, type) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: placename,
        type: type,
        key: API_KEY,
      },
    });

    const results = response?.data?.results || [];

    if (results.length === 0) {
      throw new Error('No results found for the given query.');
    }

    // Find the item with the highest rating
    const highestRatedPlace = results.reduce((max, place) =>
      (place.rating > max.rating ? place : max),
      { rating: 0 } // Initial value with a rating of 0
    );

    // Create an object with the required fields
    const resultObject = {
      place_id: highestRatedPlace.place_id,
      rating: highestRatedPlace.rating,
      photo_reference: highestRatedPlace.photos?.[0]?.photo_reference || null, // Handle case where photos might be missing
    };

    // let data = await fetchPlaceDetails(highestRatedPlace.place_id);


    // Place this object at index 0 of an array
    // console.log("_______________>",{...data,...resultObject})
    return resultObject;

  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};