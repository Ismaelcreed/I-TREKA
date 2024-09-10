import {Text, TouchableOpacity ,StyleSheet , Image} from 'react-native';
import React from 'react';
import { COLORS, SIZE } from '../constants';

const SocialBoutton = ({title , icon , onPress})  => {
    return(
        <TouchableOpacity
        onPress={onPress}
        style={style.container}>

                <Image
                source={icon}
                resizeMode='contain'
                style={{ height : 24, 
                    width : 24 , 
                    marginRight :32}}/>
                
                <Text style={{fontSize:15}}>{""}{title}</Text>
        </TouchableOpacity>
    )
};
const style = StyleSheet.create({
    container : {
        width : SIZE.width-32,
        height : 54,
        alignItems : 'center',
        paddingHorizontal : 22 , 
        borderRadius : 16 , 
        borderColor : "gray",
        flexDirection : "row",
        marginTop : 12 , 
        borderWidth : 1
    },
    icon : {
        height : 24, 
        width : 24 , 
        marginRight :32
    },
    title : {
        fontSize : 20 , 
        color: COLORS.black
    }
})
export default SocialBoutton;