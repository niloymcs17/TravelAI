// import axios from 'axios';
// import base64 from 'base64-js';
// import { MAPAPI } from '@/constants/API';
// import {  ref, uploadString, getDownloadURL } from 'firebase/storage';
// import {  storage } from '@/configs/FirebaseConfig';
// import { FIRE_REF } from '@/constants/Ref.const';

// const API_KEY = MAPAPI;
// // get photo by refernce .
// export const fetchPlacePhoto = async (photoReference:string, imageName:string) => {
//   try {
//     // Fetch the photo from the Google Places API
//     const response = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
//       params: {
//         maxwidth: 1200, // or any other desired size
//         photoreference: photoReference,
//         key: API_KEY,
//       },
//       responseType: 'arraybuffer',
//     });

//     // Convert the arraybuffer to a base64 string
//     const base64String = base64.fromByteArray(new Uint8Array(response.data));
//     const imageUrl = `data:image/jpeg;base64,${base64String}`;

//     // Initialize Firebase Storage
//     const storages = storage;
    
//     // Create a reference to the storage location with a unique path
//     const imageRef = ref(storages, `${FIRE_REF.PLACE_PHOTO_STORAGE}/${imageName}.jpg`);
    
//     // Upload the image data to Firebase Storage
//     await uploadString(imageRef, base64String, 'base64', {
//       contentType: 'image/jpeg',
//     });

//     // Get the download URL for the uploaded image
//     const downloadURL = await getDownloadURL(imageRef);

//     // Return the download URL and photo reference
//     return { downloadURL, photoReference };
//   } catch (error) {
//     console.error('Error fetching and uploading place photo:', error);
//     throw error;
//   }
// };
