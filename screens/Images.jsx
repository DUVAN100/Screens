import React from 'react';
import { Image, StyleSheet,  View, Text } from 'react-native';


const Images = () => {
  return (
    <View>
        <Text style={{color:'#EAEDED',margin:20, fontSize:50, fontFamily:'Roboto' }}>Welcome</Text>
        <Image
            source={require('../assets/imageMain.png')} 
            style={{ width: 1400, height: 600, borderBottomRightRadius:20, borderTopLeftRadius:20 }}
        />
        <Text style={{color:'#EAEDED', margin:20, fontSize:30, fontFamily:'Roboto', textAlign:'center' }}>3106252922 </Text>
    </View>
  );
}

export default Images;