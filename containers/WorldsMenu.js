import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native'
import Card from '../shared/Card'


export default function WorldsMenu(props){

const [worlds, setWorlds] = useState({})
const [cards, setCards] = useState({})

  useEffect(() => {
    fetch('http://10.225.130.145:3000/campaigns', {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      authorization: `bearer ${props.token}`
      }
    })
    .then(response => response.json())
    .then(responsejson => {setWorlds(responsejson)})
  
    fetch('http://10.225.130.145:3000/cards', {
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
    <View>
      <FlatList
        data={worlds}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> props.navigation.navigate('World Menu', {item, cards})}>
            <Card>
              <Text style={styles.text}>{item.name}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
        <TouchableOpacity>
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
    // resizeMode: 'center'
  }
})