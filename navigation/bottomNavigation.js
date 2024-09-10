import { View, Text, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons'; // Importez Feather depuis expo/vector-icons
import Chat from '../screen/Chat';
import Chats from '../screen/Chats';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    height: Platform.OS === "ios" ? 130 : 80, // Augmentez la hauteur de la barre de navigation
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                }
            }}
        >
            <Tab.Screen
                name="Acceuil"
                component={Chat}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather // Utilisez Feather pour l'icône
                            name="globe"
                            size={30} // Taille de l'icône
                            color={focused ? "#3017e8" : "#8a8994"}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Discussion"
                component={Chats}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather // Utilisez Feather pour l'icône
                            name="message-circle"
                            size={30} // Taille de l'icône
                            color={focused ? "#3017e8" : "#8a8994"}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Ajout_Post"
                component={Chat}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            alignItems: 'center',
                            marginTop : -20,
                            justifyContent: 'center',
                            backgroundColor: "#3017e8",
                            height: Platform.OS === 'ios' ? 90 : 80, // Augmentez la hauteur du bouton central
                            width: Platform.OS === 'ios' ? 90 : 80, // Augmentez la largeur du bouton central
                            top: Platform.OS === 'ios' ? -45 : 20, // Ajustez la position du bouton central
                            borderRadius: Platform.OS === 'ios' ? 45 : 40, // Ajustez le rayon de bordure du bouton central
                            borderWidth: 3,
                            borderColor: "white"
                        }}>
                            <Feather // Utilisez Feather pour l'icône
                                name="home"
                                size={30} // Taille de l'icône
                                color="white"
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Appel"
                component={Chats}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather // Utilisez Feather pour l'icône
                            name="phone"
                            size={30} // Taille de l'icône
                            color={focused ? "#3017e8" : "#8a8994"}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Config"
                component={Chats}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather // Utilisez Feather pour l'icône
                            name="settings"
                            size={30} // Taille de l'icône
                            color={focused ? "#3017e8" : "#8a8994"}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomNavigation;
