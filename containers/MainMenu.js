import React from 'react'
import {StyleSheet, Text, View, Image, Button, ShadowPropTypesIOS} from 'react-native'

export default function MainMenu(props) {
  return(
    <View style = {styles.container}>
      <Text>Welcome, {props.username}</Text>

      <View style = {styles.buttonContainer}>
        <Button
          title ="Worlds Menu"
          onPress = ""
        />
        <Button
          title ="Profile"
          onPress = ""
        />
        <Button 
          title = "Log Out"
          onPress = {() => {
            props.setUsername("")
            props.setToken("")}
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
    alignItems: "center"
  },
  buttonContainer: {
    flex: .3,
    justifyContent: "space-between"
  },
})
