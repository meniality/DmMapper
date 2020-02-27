import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'

export default function WorldMenu(props) {

  const cards = props.route.params.cards
  const worldId = props.route.params.item.id
  const addNewCardToCards = props.route.params.addNewCardToCards
  const removeCardFromCards = props.route.params.removeCardFromCards
  const removeCardFromDatabase = props.route.params.removeCardFromDatabase

  return(
    
    <View style={styles.container}>
      <Text style={styles.text}>{props.route.params.item.name}</Text>
        <View style={styles.buttonContainer}>
        <Button
          title="World Map"
          
        />
        <Button
          title="Show World Cards"
          onPress = {() => {props.navigation.navigate('Show World Cards', {
            cards,
            worldId,
            addNewCardToCards ,
            removeCardFromCards,
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