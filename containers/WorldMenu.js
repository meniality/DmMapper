import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'

export default function WorldMenu(props) {
  const worldId = props.route.params.item.id
  const removeCardFromDatabase = props.route.params.removeCardFromDatabase

  return(
    
    <View style={styles.container}>
      <Text style={styles.text}>{props.route.params.item.name}</Text>
        <View style={styles.buttonContainer}>
        {/* <Button
          title="World Map"
          
        /> */}
        <Button
          title="Show World Cards"
          onPress = {() => {props.navigation.navigate('Show World Cards', {
            worldId,
            removeCardFromDatabase
          })}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#fffaf0'
  },
  text:{
    fontSize: 40,
    marginBottom: 20
  },
  buttonContainer: {
    flex: .2,
    justifyContent: "space-between"
  }
})