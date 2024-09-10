import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';
import { SIZE, COLORS, FONTS } from '../constants';
import { useFonts } from 'expo-font';



const Boutton = (props) => {

  const [loaded] = useFonts({
    Avalon: require('../assets/fonts/avalonn.ttf'),
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      paddingHorizontal: SIZE.padding * 2,
      paddingVertical: SIZE.padding2 * 2,
      borderColor: "#3017e8",
      borderWidth: 1,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#3017e8",
    },
    buttonText: {
      color: "white",
      fontSize: 18,

    },
  });
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          borderRadius: 25,
          ...props.style,
        }}
        onPress={props.onPress}
      >
        <Text style={{ fontSize: 18, color: "white" }}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );

};

export default Boutton;
