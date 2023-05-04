import { StyleSheet, Text,  View } from 'react-native';
import React, { useState } from 'react';
import {Cars} from './screens/Cars';
import { Rent } from './screens/Rent';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput, Button, Icon } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { RegisterUser } from './screens/RegisterUser';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

var usuarios = [
   {email:"julian@gmail.com", userName:"julian", fullname:"Julian Arce", password:"1"},
 ]
var carros = [
  {plateNumber:'bbb123', brand:'Chevrolet', isChecked:true}
]
var rentas = [
  {rentNumber: '',userName: '',plateNUmber:'',rentDate:''}
]


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="MyTabs" component={MyTabs} options={{title:'Moviles Jueves'}}/>
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
        tabBarIcon:()=> <MaterialIcons size={ 20 } name={'person'}  color={ 'red' }/>
      }} />
      <Tab.Screen name="Cars" component={Cars} initialParams={[carros]} options={{
        tabBarIcon:()=> <MaterialIcons size={ 20 } name={'train'}  color={ 'red' }/>
      }} />
      <Tab.Screen name="Rent" component={Rent} initialParams={[usuarios,rentas, carros]} options={{
        tabBarIcon:()=> <MaterialIcons size={ 20 } name={'rule'}  color={ 'red' }/>
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
      <Text style={{marginBottom:20, fontSize:30, fontFamily:'Roboto' }}>Log in</Text>
      <TextInput
          style={{margin:20, borderRadius:20}}
          label="Email"
          mode="outlined"
          left={<TextInput.Icon icon="account" />}
          onChangeText={email => setEmail(email)}
          value={email}
      />
      <TextInput
          style={{margin:20, borderRadius:20}}
          label="Contraseña"
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
          setEmail('')
          setPassword('')
          navigation.navigate('Cars')
        }else{
          setFindError("Email y/o contraseña invalida")
        }
      }}>Entrar</Button>
      <Text style={{color:'red'}}>{findError}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(232 226 235)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
