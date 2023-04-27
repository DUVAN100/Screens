import { StyleSheet, Text, Button, View } from 'react-native';
import * as React from 'react';
import Contacts from './screens/Contacts'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="MyTabs" component={MyTabs} options={{title:'Systems test'}}/>
        {/* <Stack.Screen name='Products' component={ProductScreen} options={{title:'Productos'}}/>
        <Stack.Screen name='Contacts' component={Contacts} options={{title:'Contactenos'}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );  
}
function HomeScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text style={{marginBottom:20}}>Log in</Text>
    </View>

  );
}
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:true,
        tabBarActiveTintColor:'red',
        tabBarInactiveTintColor:'gray',
        tabBarActiveBackgroundColor:'aqua',
        tabBarInactiveBackgroundColor:'#6667' 
      }} 
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon:()=> <MaterialIcons size={ 20 } name={'home'}  color={ 'red' }/>
      }} />
      <Tab.Screen name="Products" component={ProductScreen} options={{
        tabBarIcon:()=> <MaterialIcons size={ 20 } name={'apps'}  color={ 'red' }/>
      }} />
      <Tab.Screen name="Contacts" component={Contacts} options={{
        tabBarIcon:()=> <MaterialIcons size={ 20 } name={'phone'}  color={ 'red' }/>
      }} />
    </Tab.Navigator>
  );
}
function ProductScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Products screen</Text>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
