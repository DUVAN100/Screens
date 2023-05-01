import React from 'react';
import { Image } from 'react-native';

const Logo = () => {
  return (
    <View>
        <Image
            source={{ uri: 'https://www.google.com/imgres?imgurl=https%3A%2F%2F1000marcas.net%2Fwp-content%2Fuploads%2F2020%2F01%2FLogo-Mazda.png&tbnid=-ePKutc4MRLUcM&vet=12ahUKEwjsgrGcztT-AhVTdzABHUO7AwwQMygBegUIARDkAQ..i&imgrefurl=https%3A%2F%2F1000marcas.net%2Fmazda-logo%2F&docid=ETQYz_p492YF5M&w=3900&h=2194&q=mazda%20logo&ved=2ahUKEwjsgrGcztT-AhVTdzABHUO7AwwQMygBegUIARDkAQ' }}
            style={{ width: 100, height: 100 }}
        />
        <Text>John Doe</Text>
  </View>
  );
}

export default Logo;