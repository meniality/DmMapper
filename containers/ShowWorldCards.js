import React, {useState} from 'react'
import {StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Modal, Image} from 'react-native'
import Card from '../shared/Card'
import { ScrollView } from 'react-native-gesture-handler'
import EditCardForm from '../shared/NewOrEditCardForm'

export default function ShowWorldCards(props){

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState([])
  const [newCardModalOpen, setNewCardModalOpen] = useState(false)

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
          <ScrollView>
            <View style = {styles.scroll}>
              <Button title='Close' onPress={()=>{setModalOpen(false)}}></Button>
              <Text style = {styles.title}>{selectedCard.name}</Text>
              <Image 
                style={{width: 250, height: 250, resizeMode: 'center'}}
                source={{uri: selectedCard.image}}> 
              </Image>
              <Text style = {styles.short_description}>{selectedCard.short_description}</Text>
              <Text>{selectedCard.text}</Text>
              <Button title='Edit'></Button>
            </View>
          </ScrollView>
        </View>
        <View style={styles.flatlist}>
          <Text style={styles.cardLabels}>Parent Cards:</Text>
            <FlatList
              horizontal={true}
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
          <Text style={styles.cardLabels}>Child Cards:</Text>
            <FlatList
              horizontal={true}
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



        <Modal visible={newCardModalOpen} animationType='slide'>
          <EditCardForm setNewCardModalOpen= {setNewCardModalOpen}/>
        </Modal>               

        <TouchableOpacity onPress={() => setNewCardModalOpen(true)}>
          <Card>
            <View style={styles.addButtonView}>
              <Image style={styles.image}source={require('../images/AddButton.png')}/>
            </View>
          </Card>
        </TouchableOpacity>          
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
  container:{
    backgroundColor: '#fffaf0'
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fffaf0'
  },
  scroll: {
    alignItems: "center",
  },
  infoScreen: {
    flex: 2.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fffaf0'
  },
  title:{
    fontSize: 30,
  },
  short_description:{
    fontSize: 20,
  },
  flatlist: {
    flex: 1,
    height: 300,
    backgroundColor: '#f5f0e6'
  },
  cardLabels:{
    fontSize:20,
  },
  addButtonView:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
})