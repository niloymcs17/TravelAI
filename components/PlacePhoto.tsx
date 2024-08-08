import { db } from '@/configs/FirebaseConfig';
import { FIRE_REF } from '@/constants/Ref.const';
import { fetchPlaceDetails, fetchPlacePhotoByID, savePhotoMetadata } from '@/hooks/photobyplaceid';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

const PlacePhoto = ({ photo }: any) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (photo) {
      getPhotosFromPlaces();
    }
  }, []);

  const getPhotosFromPlaces = async () => {
    // setUserTrips([]);
    try {
      // Reference to the document
      const docRef = doc(db, FIRE_REF.PLACE_PHOTO_STORAGE, photo);

      // Fetch the document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Document data
        const data = docSnap.data();
        if (data) {
          setPhotoUrl(data.downloadURL)
        }
      } else {
        getPhoto();
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    } finally {
      setLoading(false);
    }
  }

  const getPhoto = async () => {
    try {
      if (photo) {
        const photoReference = await fetchPlaceDetails(photo);
        console.log(",",photoReference)

        const url = await fetchPlacePhotoByID(photoReference?.photoReference);
        if (url) {
          photoReference.downloadURL = url;
          savePhotoMetadata(photoReference)
          setPhotoUrl(url);
        }

      } else {
        console.error('Photo Reference not available')
      }
    } catch (error) {
      console.error('Error loading photo:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      {photoUrl && <Image source={{ uri: photoUrl }} style={{ width: 150, height: 150, borderRadius: 10 }} />}
    </View>
  );
};

export default PlacePhoto;
