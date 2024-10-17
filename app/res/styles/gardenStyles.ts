import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({

    /*Garden screen */
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,

    },
    scrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingTop: 20,
        padding: 10,
        alignItems: 'stretch',

    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.secondary,
      marginTop: 20,
      marginBottom: 20,
    },
    plantContainer: {
        backgroundColor: theme.colors.surface,
        borderRadius: 15,
        padding: 10,
        width: '95%', // Adjust width for grid
        alignItems: 'center',
        marginBottom: 10,
        elevation: 4,
      },

      plantImage: {
        width: 155,
        height: 155,
        borderRadius: 15,
        marginBottom: 5,
      },
    plantName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: theme.colors.primary,
    },
    plantType: {
        fontSize: 14,
        color: '#777', // Lighter text for the plant type
      },


    /* Modal 

    z*/
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 0, // Ensure no padding is added
      margin: 0,  // Ensure no margin is added
    },
    modalView: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: theme.colors.background,
      padding: 0, // Ensure no padding
      margin: 0,  // Ensure no margin
    },
    imageContainer: {
      flex: 1, // Take up 50% of the available space
      justifyContent: 'center', // Center the image vertically
      alignItems: 'center', // Center the image horizontally
    },
    fullImage: {
      width: '100%', // Take full width of the container
      height: '100%', // Take full height of the container
      resizeMode: 'contain', // Maintain aspect ratio
    },
    infoContainer: {
      flex: 1, // Take up the remaining 50% of the available space
      padding: 0,
      //justifyContent: 'center', // Center the text vertically
      //alignItems: 'center', // Center the text horizontally
    },
    modalText: {
      textAlign: 'center',
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    closeButton: {
      padding: 10,
      backgroundColor: '#6eba70',
      borderRadius: 5,
    },
    plantNameModal: {
      fontSize: 50,
      fontWeight: 'bold',
      paddingTop: 0,
      marginBottom: 5,
      paddingLeft: 20,
      color: theme.colors.primary,
    },

    speciesText: {
      fontSize: 30,
      paddingLeft: 10,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 5,
    },

    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
    deleteButton: {
      padding: 10,
      backgroundColor: '#ff4d4d',
      borderRadius: 5,
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 16,
    },
    backButton: {
      position: 'absolute',
      top: 50,  // Adjust as necessary
      left: 20, // Adjust as necessary
    },
    
  });