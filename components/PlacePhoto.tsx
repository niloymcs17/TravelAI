import { fetchPlaceDetails, fetchPlacePhoto } from '@/hooks/photobyplaceid';
import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

const PlacePhoto = ({photo}:any) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.warn(photo)
    const getPhoto = async () => {
      try {
        const photoReference = await fetchPlaceDetails(photo);
        const url = await fetchPlacePhoto(photoReference);
        if(url) {

          setPhotoUrl(url);
        }
      } catch (error) {
        console.error('Error loading photo:', error);
      } finally {
        setLoading(false);
      }
    };

    getPhoto();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      {photoUrl && <Image source={{ uri: photoUrl }} style={{ width: 400, height: 300 }} />}
    </View>
  );
};

export default PlacePhoto;
