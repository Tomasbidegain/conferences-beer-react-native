import React, { useState, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import LoginScreen from './screens/LoginScreen';
import MyTabs from './MyTabs';
import CreateAccountScreen from './screens/CreateAccountScreen';
import ConferenceScreen from './screens/ConferenceScreen';

export const userContext = createContext()

export default function App() {

  const [user, setUser] = useState()

  const app = initializeApp(firebaseConfig);

  const Stack = createNativeStackNavigator();
  return (
    <userContext.Provider value={{user, setUser, app}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='SignIn' component={MyTabs} options={{headerShown: false}}/>
        <Stack.Screen name='Create Account' component={CreateAccountScreen}/>
        <Stack.Screen name='Details' component={ConferenceScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </userContext.Provider>
  );
}
