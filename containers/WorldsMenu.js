import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert} from 'react-native'
import Card from '../shared/Card'
import { URL } from '../shared/BackendURL'
import {connect} from 'react-redux'
import actions from '../src/actions'

const {worldsActions: {setInitialWorldsAction, removeWorldFromWorldsAction}} = actions
const {cardsActions: {setInitialCardsAction}} = actions

function WorldsMenu(props){
  
  const {worlds} = props 

  const removeCardFromDatabase = (cardId) => {
    fetch(`${URL}/cards/${cardId}`,{
      method: 'DELETE',
      headers: {
        authorization: `bearer ${props.token}`
      }
    })
  }

  const removeWorldFromDatabase = (campaignId) => {
    fetch(`${URL}/campaigns/${campaignId}`,{
      method: 'DELETE',
      headers: {
        authorization: `bearer ${props.token}`
      }
    })
  }

  useEffect(() => {
    fetch(`${URL}/campaigns`, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      authorization: `bearer ${props.token}`
      }
    })
    .then(response => response.json())
    .then(responsejson => {
      props.setInitialWorlds(responsejson)
      
    })

    fetch(`${URL}/cards`, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      authorization: `bearer ${props.token}`
      }
    })
    .then(response => response.json())
    .then(responsejson => {props.setInitialCardsAction(responsejson)})
  }, [])

    return(
      <View style = {styles.container}>
        <FlatList
          data={worlds}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={()=> props.navigation.navigate('World Menu', 
                {item,
                removeCardFromDatabase
              })}
              onLongPress={() => 
                Alert.alert("Delete This World?",
                  "are you sure?",
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => {
                    props.removeWorldFromWorlds(item)
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
        <TouchableOpacity onPress={()=> props.navigation.navigate('Create A New World')}>
          <Card>
            <View style={styles.addButtonView}>
              <Image style={styles.image}source={require('../images/AddButton.png')}/>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    )
  }

  const mapStateToProps = (state) => ({
    worlds: state.worlds,
    cards: state.cards
  })

  const mapDispatchToProps = (dispatch) => ({
    setInitialWorlds: (worlds) => dispatch(setInitialWorldsAction(worlds)),
    removeWorldFromWorlds: (world) => dispatch(removeWorldFromWorldsAction(world)),
    setInitialCardsAction: (cards) => dispatch(setInitialCardsAction(cards))
  })

  export default connect(mapStateToProps, mapDispatchToProps)(WorldsMenu)

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
  }
)