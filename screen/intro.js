import React from "react";
import { ImageBackground, StyleSheet, View, Text, Image, Dimensions, ScrollView, StatusBar } from "react-native";
import Boutton from "../composant/button";
import icons from "../constants/icons";
import { COLORS, FONTS, SIZE } from "../constants";

const { width, height } = Dimensions.get('window');

const Intro = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={icons.logoApp} style={styles.imageBackground}>
        <StatusBar hidden />
        <Image source={icons.discussion} style={styles.additionalImage} />
        <View style={styles.contentContainer}>
          {/* Ajoutez votre contenu ici si nécessaire */}
        </View>
        <View style={styles.buttonContainer}>
          <Boutton
            title="HANOMBOKA"
            onPress={() => navigation.navigate("Acceuil")}
            style={styles.button}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text>Tongasoa eto amin'ny tambazotran-tseratsera I-TREKA</Text>
          <Text>Manasa anao hatrany hampiasa azy amin'ny fotoana izay mety aminao</Text>
          <Text style={styles.copyright}>© 2024 Développé par Ismael</Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  imageBackground: {
    flex: 1.5,
    justifyContent: "flex-start",
    alignItems: "center",
    width: '100%',
    height: height * 0.5,
    marginTop: 2, // Ajustez cette valeur pour déplacer l'image de fond vers le bas
  },
  additionalImage: {
    width: "80%",
    height: height * 0.2,
    resizeMode: 'contain',
    marginTop: 40, // Ajustez cette valeur pour déplacer le logo vers le bas
    marginBottom: 20,
  },
  contentContainer: {
    flex: 2,
    padding: 15,
    width: '10%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 100,
  },
  button: {
    width: width * 0.7,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  bottomContainer: {
    backgroundColor: COLORS.grey,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
    padding: 16,
    width: '100%',
    marginTop: 50,
  },
  copyright: {
    marginTop: 10,
    fontSize: 12,
    color: "#888",
  },
});

export default Intro;
