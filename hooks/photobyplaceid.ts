import axios from 'axios';
import base64 from 'base64-js';
import { MAPAPI } from '@/constants/API';
import { db } from '@/configs/FirebaseConfig';
import { FIRE_REF } from '@/constants/Ref.const';
import { doc, setDoc } from 'firebase/firestore';

const API_KEY = MAPAPI;

export interface IPhotoMetadata {
  placeid: string;
  photoReference: string;
  directionURL: string;
  formatted_address: string;
  downloadURL?: string;
}

export interface IHotelMetadata {
  place_id: string;
  rating: string;
  photo_reference: string;
  downloadURL?: string;
}

export const fetchPlaceDetails = async (placeId: string): Promise<IPhotoMetadata> => {
  try {
    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: { place_id: placeId, key: API_KEY },
    });

    const photo = data?.result?.photos?.[0];
    if (!photo) {
      throw new Error('No photos available for this place.');
    }

    return {
      placeid: placeId,
      photoReference: photo.photo_reference,
      directionURL: data.result.url,
      formatted_address: data.result.formatted_address,
    };
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};

export const fetchPlacePhotoByID = async (photoReference: string): Promise<string> => {
  try {
    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
      params: { maxwidth: 1200, photoreference: photoReference, key: API_KEY },
      responseType: 'arraybuffer',
    });

    const base64String = base64.fromByteArray(new Uint8Array(data));
    return `data:image/jpeg;base64,${base64String}`;
  } catch (error) {
    console.error('Error fetching place photo:', error);
    throw error;
  }
};

export const savePhotoMetadata = async (data: IPhotoMetadata): Promise<void> => {
  try {
    await setDoc(doc(db, FIRE_REF.PLACE_PHOTO_STORAGE, data.placeid), data);
    console.log('Photo metadata saved successfully.');
  } catch (error) {
    console.error('Error saving photo metadata:', error);
    throw error;
  }
};

export const savePhotoMetadataH = async (data: IHotelMetadata): Promise<void> => {
  try {
    await setDoc(doc(db, FIRE_REF.HOTEL_PHOTO_STORAGE, data.place_id), data);
    console.log('Photo metadata saved successfully.');
  } catch (error) {
    console.error('Error saving photo metadata:', error);
    throw error;
  }
};

export const placeDetailsBySearch = async (placename: string, type: string): Promise<IHotelMetadata> => {
  try {
    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: { query: placename, type, key: API_KEY },
    });

    const results = data?.results || [];
    if (results.length === 0) {
      throw new Error('No results found for the given query.');
    }

    const highestRatedPlace = results.reduce((max, place) =>
      (place.rating > max.rating ? place : max), { rating: 0 }
    );

    return {
      place_id: highestRatedPlace.place_id,
      rating: highestRatedPlace.rating,
      photo_reference: highestRatedPlace.photos?.[0]?.photo_reference || '',
    };
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};
