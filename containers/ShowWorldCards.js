import React, {useState} from 'react'
import {StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Modal, Image} from 'react-native'
import Card from '../shared/Card'
import { ScrollView } from 'react-native-gesture-handler'

export default function ShowWorldCards(props){

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  const id = props.route.params.worldId
  
  const worldCards = () => {
    return props.route.params.cards.filter(card => {
      return card.campaign_id === id
    })
  }

  const setSelectedCardFromModal = (id) => {
    const newSelectedCard = props.route.params.cards.filter(card => {
      return card.id === id
    })
    setSelectedCard(newSelectedCard[0])  
  }

  return(
    <View style={styles.container}>
      <Modal visible={modalOpen} animationType='slide'>
        <View style={styles.infoScreen}>
          <ScrollView >
            <Button title='Close' onPress={()=>{setModalOpen(false)}}></Button>
            <Text>{selectedCard.name}</Text>
            <Image 
              style={{width: 250, height: 250, resizeMode: 'center'}}
              source={{uri: selectedCard.image}}> 
            </Image>
            <Text>{selectedCard.short_description}</Text>
            <Text>{selectedCard.text}</Text>
          </ScrollView>
        </View>
          <View style={styles.flatlist}>
            <Text>Parent Cards:</Text>
              <FlatList
                data={selectedCard.parentCards}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=> {
                    setSelectedCardFromModal(item.id)
                    }}>
                    <Card>
                      <Text>{item.name}</Text>
                    </Card>
                  </TouchableOpacity>
                )}
              />
            <Text>Child Cards:</Text>
              <FlatList
                data={selectedCard.childCards}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=> {
                    setSelectedCardFromModal(item.id)
                    }}>
                    <Card>
                      <Text>{item.name}</Text>
                    </Card>
                  </TouchableOpacity>
                )}
              />
            </View>  
        </Modal>

        <FlatList
        data={worldCards()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> {
            setModalOpen(true)
            setSelectedCard(item)
            }}>
            <Card>
              <Text>{item.name}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  // container:{
  //   flex: 1,
  // },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // overflow: "scroll",
    // height:1000,
  },
  infoScreen: {
    flex: 2.2,
  },
  flatlist: {
    flex: 1,
    height: 300,
  }
})