import React from 'react'
import {StyleSheet, Text, View, Button,} from 'react-native'

export default function MainMenu(props) {
  return(
    <View style = {styles.container}>
      <Text style = {styles.text}>Welcome,  {props.username}</Text>

      <View style = {styles.buttonContainer}>
        <Button
          title ="Worlds Menu"
          onPress = {() => {props.navigation.navigate('Worlds Menu')}}
        />
        <Button
          title ="Profile"
          onPress = ""
        />
        <Button 
          title = "Log Out"
          onPress = {() => {
            props.setUsername("")
            props.setToken("")
            props.navigation.navigate('SignIn')}
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fffaf0'
  },
  buttonContainer: {
    flex: .3,
    justifyContent: "space-between"
  },
  text: {
    marginBottom: 20,
    fontSize: 20,
  }
})
