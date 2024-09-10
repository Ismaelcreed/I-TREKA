import { Dimensions } from "react-native";
const {height , width} = Dimensions.get("window");

export const COLORS = {
    primary : "#3017e8",
    white : "#fff",
    grey : "#f3f3f3f3",
    black : "#0000",
    gray : "#8a8994",
    secondaryGray : "#808080"

};
export const SIZE = {
    base : 8,
    font : 14 ,
    radius : 30 , 
    padding : 8 , 
    padding1 : 12 , 
    padding2 : 16,

    largerTitle : 50,
    h1 : 36,
    h2 : 22,
    h3 : 16 , 
    h4 : 14 , 
    body1 : 30 ,
    body2 : 20 , 
    body3 : 16 ,
    body4 : 14 , 

    width,
    height

};
export const FONTS = {
    largerTitle : {fontFamily : 'black' , fontSize : SIZE.largerTitle , lineHeight : 5},
    h1 : {fontFamily : 'bold' , fontSize : SIZE.h1 , lineHeight : 36},
    h2 : {fontFamily : 'bold' , fontSize : SIZE.h2 , lineHeight : 30},
    h3 : {fontFamily : 'bold' , fontSize : SIZE.h3 , lineHeight : 22},
    h4 : {fontFamily : 'bold' , fontSize : SIZE.h4 , lineHeight : 20},
    body1 : {fontFamily : 'regular' , fontSize: SIZE.body1 , lineHeight : 36},
    body2 : {fontFamily : 'regular' , fontSize: SIZE.body2 , lineHeight : 30},
    body3 : {fontFamily : 'regular' , fontSize: SIZE.body3 , lineHeight : 22},
    body4 : {fontFamily : 'regular' , fontSize: SIZE.body4 , lineHeight : 20},
} ;
const appTheme = {COLORS , SIZE , FONTS}

export default appTheme; 
