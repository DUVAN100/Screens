import { StyleSheet,  View } from 'react-native';
import Images from './Images';

export default function Contacts(){
    return(
        <View style={styles.container}>
          <Images/>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#AF7AC5',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });