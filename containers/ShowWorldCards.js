import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'

export default function ShowWorldCards(props){

  const id = props.route.params.worldId
  
  const worldCards = () => {
    return props.route.params.cards.filter(card => {
      console.log(card.campaign_id)
    })
  }

  return(
    worldCards(),
  <Text>World id =</Text>
  )
}