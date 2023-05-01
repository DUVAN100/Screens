import { StyleSheet, Text, TextInput ,Button, View } from 'react-native';


export default function Contacts({navigation, route}){
    const {name, email} = route.params;
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{marginBottom:10}}>Contactenos</Text>
            <Text style={{marginBottom:10}}>Your fullname is: {name} with email: {email}</Text>
        </View>
    )

}