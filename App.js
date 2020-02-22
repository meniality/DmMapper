import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './containers/SignIn'
import MainMenu from './containers/MainMenu'



export default function App() {

const [username, setUsername] = useState("")
const [token, setToken] = useState("")


    return (
      console.log(username),
      <View style={styles.container}>
        {!username
        ?<SignIn setUsername = {setUsername} setToken = {setToken}/>
        :<MainMenu username = {username} setUsername = {setUsername} setToken = {setToken}/>}
      </View>
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
