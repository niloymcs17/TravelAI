import { fetchPlaceDetails, fetchPlacePhoto } from '@/hooks/photobyplaceid';
import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

const PlacePhoto = ({photo}:any) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPhoto();
  }, []);

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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{  alignItems:"center",flex:1}}>
      {photoUrl && <Image source={{ uri: photoUrl }} style={{ width: 150, height: 150  , borderRadius:10}} />}
    </View>
  );
};

export default PlacePhoto;
