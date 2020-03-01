import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import Card from '../shared/Card'

export default function AddRelationshipButton(){
  return(
    <Card>
      <View style={styles.button}>
        <Image style={styles.image} source={require('../images/AddButton.png')}/>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 19,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  image: {
    width: 30,
    height: 30
  }
})