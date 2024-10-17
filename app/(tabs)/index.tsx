import React, { useCallback, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, TouchableOpacity, Alert, Animated } from 'react-native';
import { useRoute, RouteProp, useFocusEffect, NavigationProp, Theme as NavigationTheme } from '@react-navigation/native';
import { getImages, deleteImage } from '@/app/utils/database';
import TopBar from '@/components/TopBar';
import { Button, Provider as PaperProvider, useTheme, MD3Theme } from 'react-native-paper';
import { makeStyles } from '@/app/res/styles/gardenStyles'; // Import the styles
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function GardenScreen() {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [images, setImages] = useState<{ name: string, uri: string, species: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ name: string, uri: string, species: string } | null>(null);

/*random stuff for the modal view */

  // Ref for tracking scroll position
  const scrollY = useRef(new Animated.Value(0)).current;

  const HEADER_MAX_HEIGHT = 250; // Max height of the header (image)
  const HEADER_MIN_HEIGHT = 70; // Min height after scrolling
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  // Interpolations for the animated header (image)
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

/*end of random stuff for modal view */


  useFocusEffect(
    useCallback(() => {
      getImages(setImages);
    }, [])
  );

  const handleImageClick = (image: { name: string, uri: string, species: string }) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleDeleteImage = () => {
    if (selectedImage) {
      Alert.alert(
        'Delete Image',
        'Are you sure you want to delete this image?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              // Delete the image from the database
              deleteImage(selectedImage.uri);
              // Update the images state
              setImages(images.filter(image => image.uri !== selectedImage.uri));
              // Close the modal
              setModalVisible(false);
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const handleSettingsPress = () => {
    // Handle the settings button press here (e.g., navigate to settings screen)
    alert('Settings button pressed');
  };

  return (
    <View style={styles.container}>
      <TopBar title="My Garden" showSettings={true} onSettingsPress={handleSettingsPress} />
      {/*<Text style={styles.heading}>My Garden</Text>*/}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
            <View style={styles.plantContainer}>
              <Image source={{ uri: image.uri }} style={styles.plantImage} />
              <Text style={styles.plantName}>{image.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>


<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <GestureHandlerRootView style={{ flex: 1 }}>
    <PanGestureHandler
      onGestureEvent={(event) => {
        if (event.nativeEvent.translationY > 50) {
          setModalVisible(false); // Close the modal if scrolled down enough
        }
      }}
    >
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.modalView}>
          {selectedImage && (
            <>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: selectedImage.uri }} style={styles.fullImage} />
                </View>
                <View style={styles.infoContainer}>
                <Text style={styles.plantNameModal}>{selectedImage.name}</Text>

                  <Text style={styles.speciesText}>Plant Species: {selectedImage.species}</Text>
                </View>

              {/* Back button in the top-left corner */}
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons name="arrow-down-circle" size={30} color={theme.colors.onBackground}/>
              </TouchableOpacity>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDeleteImage}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </PanGestureHandler>
  </GestureHandlerRootView>
</Modal>


    </View>
  );
}