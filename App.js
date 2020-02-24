import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './containers/SignIn'
import MainMenu from './containers/MainMenu'
import CreateNewUser from './containers/CreateNewUser'



export default function App() {

const [username, setUsername] = useState("")
const [token, setToken] = useState("")

const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignIn">
            {props => <SignIn {...props} 
              setUsername={setUsername} 
              setToken={setToken}/>}
          </Stack.Screen>
          <Stack.Screen name="MainMenu">
            {props => <MainMenu {...props} 
              setUsername={setUsername} 
              setToken={setToken}
              username={username}/>}
          </Stack.Screen>
          <Stack.Screen name="Create New User">
            {props => <CreateNewUser {...props} 
              setUsername={setUsername} 
              setToken={setToken}
              />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

});
