import React, { useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './containers/SignIn'
import MainMenu from './containers/MainMenu'
import CreateNewUser from './containers/CreateNewUser'
import WorldsMenu from './containers/WorldsMenu'
import WorldMenu from './containers/WorldMenu'
import ShowWorldCards from './containers/ShowWorldCards'
import CreateNewWorld from './containers/CreateNewWorld'
import store from './src/store/index'
import {Provider} from 'react-redux'

function App() {

  const [username, setUsername] = useState("")
  const [token, setToken] = useState("")
  
  const Stack = createStackNavigator();

    return (
      <Provider store ={store}>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'tomato' },
            }}>
            <Stack.Screen name="SignIn">
              {props => <SignIn {...props} 
                setUsername={setUsername} 
                setToken={setToken}/>}
            </Stack.Screen>
            <Stack.Screen name="MainMenu">
              {props => <MainMenu {...props} 
                setUsername={setUsername} 
                setToken={setToken}
                username={username}
                token={token}/>}
            </Stack.Screen>
            <Stack.Screen name="Create New User">
              {props => <CreateNewUser {...props} 
                setUsername={setUsername} 
                setToken={setToken}
                />}
            </Stack.Screen>
            <Stack.Screen name="Worlds Menu">
              {props => <WorldsMenu {...props} 
                token={token}
                />}
            </Stack.Screen>
            <Stack.Screen name="World Menu">
              {props => <WorldMenu {...props} 
                token={token}
                />}
            </Stack.Screen>
            <Stack.Screen name="Show World Cards">
              {props => <ShowWorldCards {...props} 
                token={token}
                />}
            </Stack.Screen>
            <Stack.Screen name="Create A New World">
              {props => <CreateNewWorld {...props} 
                token={token}
                />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }

 
  export default (App);