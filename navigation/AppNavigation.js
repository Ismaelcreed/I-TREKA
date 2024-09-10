import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {Acceuil , Chat ,Intro} from "../screen";
import BottomNavigation from "./bottomNavigation";

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    return(
       <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
             initialRouteName='Intro'>
                    <Stack.Screen name="Acceuil" component={Acceuil}/>
                    <Stack.Screen name="Chat" component={Chat}/>
                    <Stack.Screen name="Intro" component={Intro}/>
                    <Stack.Screen name="Main" component={BottomNavigation}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigation;