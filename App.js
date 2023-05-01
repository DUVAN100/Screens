import { StyleSheet, Text,  View } from 'react-native';
import React, { useState } from 'react';
import Contacts from './screens/Contacts'
import {Cars} from './screens/Cars'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput, Button, Icon } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { RegisterUser } from './screens/RegisterUser';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

let usuarios = [
   {email:"duvan", name:"Duvan" ,password:"1"},
   {email:"duvan2", name:"Duvan2" ,password:"2"}
 ]


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="MyTabs" component={MyTabs} options={{title:'Systems test'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );  
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:'red',
        tabBarInactiveTintColor:'gray',
        tabBarActiveBackgroundColor:'aqua',
        tabBarInactiveBackgroundColor:'#6667',
        
      }} 
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarStyle:{display:'none'},
        tabBarIcon:()=> <MaterialIcons size={ 20 } name={'logout'}  color={ 'red' }/>
      }} />
      <Tab.Screen name="User" component={RegisterUser} initialParams={[usuarios]} options={{
        tabBarStyle:{display:'none'},
        tabBarIcon:()=> <MaterialIcons size={ 20 } name={'person'}  color={ 'red' }/>
      }} />
      <Tab.Screen name="Cars" component={Cars} options={{
        tabBarIcon:()=> <MaterialIcons size={ 20 } name={'apps'}  color={ 'red' }/>
      }} />
      <Tab.Screen name="Contacts" component={Contacts} options={{
        tabBarIcon:()=> <MaterialIcons size={ 20 } name={'phone'}  color={ 'red' }/>
      }} />
    </Tab.Navigator>
  );
}

function HomeScreen({navigation}){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [findError, setFindError] = useState('');
  return(
    <View style={styles.container}>
      <Text style={{marginBottom:20}}>Log in</Text>
      <TextInput
          style={{margin:20, borderRadius:10}}
          label="Email"
          mode="outlined"
          left={<TextInput.Icon icon="account" />}
          onChangeText={email => setEmail(email)}
          value={email}
      />
      <TextInput
          style={{margin:20, borderRadius:10}}
          label="Password"
          mode="outlined"
          right={<TextInput.Icon icon="eye" />}
          onChangeText={password => setPassword(password)}
          value={password}
          secureTextEntry
      />
      <Button icon="login" mode="contained" onPress={() =>{
        let findUser = usuarios.find(usr => usr.email == email && usr.password == password)
        if(findUser != undefined){
          setFindError('')
          const {name, email} = findUser
          setEmail('')
          setPassword('')
          navigation.navigate('Contacts',{name:name, email:email} )
        }else{
          setFindError("Email y/o password invalid")
        }
      }}>Log in</Button>
      <Text style={{color:'red'}}>{findError}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C3483',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
