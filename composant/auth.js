import * as React from 'react'
import { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet , Text , View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession()
const [userInfo , setUserInfo] = useState(null);
const [request , response , promptAsync] = Google.useAuthRequest({
    androidClientId : "312775053393-sli3rji6vuudmi6ir75rb1i3jnsjlb7u.apps.googleusercontent.com",
    webClientId : "312775053393-shfahlicku7pn9h3ue3f5i1p4jmlmagi.apps.googleusercontent.com"
})
export default function Auth (){
    return(
             <View style={style.container}>
                 <Text></Text>
                 <StatusBar style="auto"/>
             </View>
              
    )
}; 
const style = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : "#fff",
        alignItems : "center",
        justifyContent : "center"
    }
})