import { View, Text, StyleSheet, Image, TouchableOpacity , Dimensions} from "react-native";
import React from 'react';
import { useState , useEffect} from "react";
import { COLORS, FONTS, SIZE, icons } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SocialBoutton from '../composant/SocialBoutton';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocialButton from '../composant/SocialBoutton';
import Boutton from "../composant/button";

const Acceuil = ({ navigation }) => {
    WebBrowser.maybeCompleteAuthSession()
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "312775053393-sli3rji6vuudmi6ir75rb1i3jnsjlb7u.apps.googleusercontent.com",
        webClientId: "312775053393-shfahlicku7pn9h3ue3f5i1p4jmlmagi.apps.googleusercontent.com",
    });

    async function handleSignin() {
        const user = await AsyncStorage.getItem("@user");
        if (!user) {
            if (response?.type === "success") {
                await getUserInfo(response.authentication.accessToken);
            }
        } else {
            setUserInfo(JSON.parse(user));
        }
    }

    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
            console.log(userInfo)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSignin();
    }, [response]);

    const handleSignout = async () => {
        await AsyncStorage.removeItem("@user");
        setUserInfo(null);
        Alert.alert("Connexion annulé!");
    };
    
   
    return (
        <SafeAreaView style={styles.area}>
            <StatusBar hidden />
            <View style={styles.container}>
                <Image
                    resizeMode='contain'
                    source={icons.discussion}
                    style={styles.logo}
                />
                <Text style={styles.title}>Rebienvenue</Text>
                <Text style={styles.subtitle}>Tohizo hatrany ny fifandraisanao amin'ny hafa</Text>
                {userInfo && (
                        <>
                         <Text style={styles.titl}>Ianao tokoa io?</Text>
                          <Image
                            source={{ uri: userInfo?.picture }}
                            style={styles.userImage}
                        />
                            <Text style={styles.userInfoText}>
                                Nom : {userInfo.name}
                            </Text>
                            <Text style={styles.userInfoText}>
                                Email : {userInfo.email}
                            </Text>
                            <Text style={styles.titl}>Ianao tokoa io?</Text>
                            <TouchableOpacity onPress={() => handleSignout()}>
                                <Text style={styles.bottomSubtitle}>Fafana anio kaonty io</Text>
                            </TouchableOpacity>
                        </>
                    )}

                <View style={{ marginVertical: 32 }}>
                    <SocialButton
                        title="Ampidiro ny kaonty google anao"
                        icon={icons.googleLogo}
                        onPress={() => promptAsync()}
                    />
                </View>
                {userInfo &&(
                    <>
                      <View style={{ marginVertical: 12 }}>
                            <SocialButton
                                title="Fafana anio kaonty io"
                                icon={icons.edit}
                                onPress={() => handleSignout()}
                            />
                        </View>
                    </>)}
                   
                    {userInfo &&(
                    <>
                        <View style={styles.buttonContainer}>
                        <Boutton
                            title="Hiresaka"
                            onPress={() => navigation.navigate("Main")}
                            style={styles.button}
                        />
                        </View>
                    </>)}
                    
                <View style={{ flexDirection: "row" }}>
                    <Text>Hamarino amin'ny kaonty google ny fidiranao</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomTitle}>Raha te hanohy, dia araho avy hatrany ireo toromarika</Text>
                    <TouchableOpacity>
                        <Text style={styles.bottomSubtitle}>Mazotoa hatrany.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: "white"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        padding: 20
    },
    logo: {
        width: 120,
        height: 170,
        marginBottom: 22,
        marginTop: -22
    },
    title: {
        fontSize: 28,
        color: "black",
        marginVertical: 12,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 18,
        color: "black",
        textAlign: 'center',
        paddingHorizontal: 16
    },
    bottomContainer: {
        position: "absolute",
        bottom: 64,
        right: 0,
        left: 23,
        width: '100%',
        alignItems: "center"
    },
    bottomTitle: {
        fontSize: 12,
        color: "black",
        textAlign: 'center'
    },
    bottomSubtitle: {
        fontSize: 12,
        color: "black",
        marginTop: 2,
        textAlign: 'center'
    },
    titl: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
    },
    userInfoContainer: {
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 20,
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userInfoText: {
        fontSize: 16,
        marginBottom: 8,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 100,
      },
     
    button: {
        width: width * 0.7, // Utilisation de la variable width définie ci-dessus
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
});

export default Acceuil;
