import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert} from 'react-native'
import Card from '../shared/Card'
import { URL } from '../shared/BackendURL'

export default function WorldsMenu(props){

const [worlds, setWorlds] = useState({})
const [cards, setCards] = useState({})

const addNewWorldToWorlds = (newWorld) => {
  setWorlds([...worlds, newWorld])
}

const removeWorldFromWorlds = (removeWorld) => {
  const newWorlds = worlds.filter(world =>{
    return world.id !== removeWorld.id
  })
  setWorlds(newWorlds)
}

const removeWorldFromDatabase = (campaignId) => {
  fetch(`http://${URL}/campaigns/${campaignId}`,{
    method: 'DELETE',
    headers: {
      authorization: `bearer ${props.token}`
    }
  })
}

useEffect(() => {
  fetch(`http://${URL}/campaigns`, {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    authorization: `bearer ${props.token}`
    }
  })
  .then(response => response.json())
  .then(responsejson => {setWorlds(responsejson)})

  fetch(`http://${URL}/cards`, {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    authorization: `bearer ${props.token}`
    }
  })
  .then(response => response.json())
  .then(responsejson => {setCards(responsejson)})
}, [])

  return(
    <View style = {styles.container}>
      <FlatList
        data={worlds}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={()=> props.navigation.navigate('World Menu', {item, cards})}
            onLongPress={() => 
              Alert.alert("Delete This World?",
                "are you sure?",
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                  removeWorldFromWorlds(item)
                  removeWorldFromDatabase(item.id)
                }},
              ]
              )}
              keyExtractor={(item) => item }
            >
            <Card>
              <Text style={styles.text}>{item.name}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={()=> props.navigation.navigate('Create A New World', {addNewWorldToWorlds})}>
        <Card>
          <View style={styles.addButtonView}>
            <Image style={styles.image}source={require('../images/AddButton.png')}/>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffaf0',
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: "center"
  },
  addButtonView:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  }
})