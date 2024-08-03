import axios from 'axios';
import base64 from 'base64-js';

const API_KEY = 'AIzaSyAJQsu6pd9FQovj0Hgd7JCp19WL0mq0BUY';

export const fetchPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        key: API_KEY,
      },
    });

    if (response.data.result.photos && response.data.result.photos.length > 0) {
      const photoReference = response.data.result.photos[0].photo_reference;
      return photoReference;
    } else {
      throw new Error('No photos available for this place.');
    }
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};

// Function to fetch photo using the photo reference and convert to base64
export const fetchPlacePhoto = async (photoReference) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
      params: {
        maxwidth: 400, // or any other desired size
        photoreference: photoReference,
        key: API_KEY,
      },
      responseType: 'arraybuffer',
    });

    // Convert arraybuffer to base64 string
    const base64String = base64.fromByteArray(new Uint8Array(response.data));
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    return imageUrl;
  } catch (error) {
    console.error('Error fetching place photo:', error);
    throw error;
  }
};