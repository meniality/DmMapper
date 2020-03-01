import React, {useState} from 'react'
import {Text, Button, View, FlatList, TouchableOpacity} from 'react-native'
import { SearchBar } from 'react-native-elements'
import Card from "./Card"
import URL from './BackendURL'

export default function AddNewRelationshipModal(props){

  const [search, setSearch] = useState("")
  const relationshipType = props.relationshipType

  const searchCards = () =>{
    return props.cards.filter(card=>{
      return card.name.includes(search)
    })
  }

  const addRelationshipFetch = () => {

    fetch(`http://${URL}/card_relationships`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      authorization: `bearer ${props.token}`,
      },
      body: JSON.stringify({"card_relationships":{child_card_id, parent_card_id}})
    })
  }

  return(
    <View>
      <Button 
        title="close"
        onPress={() => {
          props.setAddRelationshipModalOpen(false)}}
      />
      <Text>Choose a Card To Add as a {`${relationshipType}`}</Text>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value = {search}
      />
      <FlatList
          data={searchCards()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              // onPress={}
            >
              <Card>
                <Text>{item.name}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
    </View>
  )
}