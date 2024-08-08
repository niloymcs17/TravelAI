// HotelCard.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { fetchPlacePhotoByID, placeDetailsBySearch, savePhotoMetadataH } from '@/hooks/photobyplaceid';
import { db } from '@/configs/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { FIRE_REF } from '@/constants/Ref.const';
interface Hotel {
  hotelName: string;
  address: string;
  price: string;
  rating: number;
  description: string;
}

interface HotelCardProps {
  hotel: Hotel;
}
const url = "https://cdn0.weddingwire.in/vendor/1739/3_2/960/jpg/welcomhotel-by-itc-hotels-raja-sansi-guest-accomodation-1_15_361739-162133553426888.jpeg";
const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const [fab, setFab] = useState<"heart-sharp" | "heart-outline">("heart-outline")
  const [photoUrl, setPhotoUrl] = useState(url)

  const handleFab = () => {
    if (fab == "heart-sharp") {
      // this is working

      setFab("heart-outline");
    } else {
      setFab("heart-sharp");
    }
  }

  useEffect(() => {
    getPhotos();
  }, [])

  const getPhotos = async () => {
    // setUserTrips([]);
    try {
      const photo = await placeDetailsBySearch(`${hotel?.hotelName} , ${hotel?.address}`, "hotel")
      // Reference to the document
      const docRef = doc(db, FIRE_REF.HOTEL_PHOTO_STORAGE, photo.place_id);

      // Fetch the document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Document data
        const data = docSnap.data();
        if (data) {

          setPhotoUrl(data.downloadURL)
        }
      } else {
        getPhoto(photo);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    } finally {
      // setLoading(false);
    }
  }


  const getPhoto = async (photo) => {
    try {
      if (photo) {

        const url = await fetchPlacePhotoByID(photo?.photo_reference);
        if (url) {

          photo.downloadURL = url;
          savePhotoMetadataH(photo)
          setPhotoUrl(url);
        }

      } else {
        console.error('Photo Reference not available')
      }
    } catch (error) {
      console.error('Error loading photo:', error);
    } finally {
    }
  };


  return (
    <Card style={styles.hotelCard}>
      <Image source={{ uri: photoUrl }} style={styles.image} />
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.hotelName}>{hotel?.hotelName}</Text>
          <Pressable onPress={handleFab}>
            <Ionicons name={fab} size={24} color={Colors.primary} />
          </Pressable>
        </View>
        <View style={styles.locationRow}>
          <MaterialIcons name="place" size={25} color="red" />
          <Text style={styles.address}>{hotel?.address}</Text>
        </View>
        <View style={styles.ratingRow}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="star" size={25} color="#FFD700" />
            <Text style={styles.rating}>{hotel?.rating}</Text>
          </View>
          <Text style={styles.price}>{hotel?.price} /night</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  hotelCard: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    width: 300,
  },
  image: {
    width: '100%',
    height: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopStartRadius: 20,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    margin: 0,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  address: {
    marginLeft: 4,
    fontSize: 14,
    color: 'gray',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginVertical: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10
  },
  button: {
    borderRadius: 20,
  },
});

export default HotelCard;
