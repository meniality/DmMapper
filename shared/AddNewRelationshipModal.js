import React, {useState} from 'react'
import {Text, Button, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import { SearchBar } from 'react-native-elements'
import Card from "./Card"
import {URL} from './BackendURL'

export default function AddNewRelationshipModal(props){

  const [search, setSearch] = useState("")
  const relationshipType = props.relationshipType

  const worldCards = props.cards.filter(card =>{
      return card.campaign_id == props.world_id && card.id !== props.selectedCard.id
  })
  

  const searchCards = () =>{
    return worldCards.filter(card=>{
      return card.name.includes(search)
    })
  }

  const addRelationshipFetch = (choosenCardId) => {

    const child_card_id = 
      props.relationshipType === "Parent"
        ? props.selectedCard.id
        : choosenCardId

    const parent_card_id = 
      props.relationshipType === "Parent"
        ? choosenCardId
        : props.selectedCard.id

    fetch(`${URL}/card_relationships`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      authorization: `bearer ${props.token}`,
      },
      body: JSON.stringify({"card_relationships":{child_card_id, parent_card_id}})
    })

    props.addRelationship(parent_card_id, child_card_id)
    props.setAddRelationshipModalOpen(false)
  }



  return(
    <View style={styles.container}>
      <Button 
        title="close"
        onPress={() => {
          props.setAddRelationshipModalOpen(false)}}
      />
      <Text style={styles.text}>Choose a Card To Add as a {`${relationshipType}`}</Text>
      <View style={styles.flatlist}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={setSearch}
          value = {search}
        />
        <FlatList
            data={searchCards()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={()=>{addRelationshipFetch(item.id)}}
              >
                <Card>
                  <Text>{item.name}</Text>
                </Card>
              </TouchableOpacity>
            )}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fffaf0',
    paddingBottom: 0,
    flex: 1,
    alignItems: "center",
    paddingTop:10
  },
  text:{
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10
  },
  flatlist:{
    alignSelf: "stretch",
    marginBottom:150
  }
})