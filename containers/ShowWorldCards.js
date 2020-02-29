import React, {useState} from 'react'
import {StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Modal, Image, Alert} from 'react-native'
import Card from '../shared/Card'
import { ScrollView } from 'react-native-gesture-handler'
import NewCardForm from '../shared/NewOrEditCardForm'
import {connect} from 'react-redux'
import actions from '../src/actions'

const {cardsActions: {removeCardFromCardsAction, addCardToCardsAction, updateCardInCardsAction}} = actions
const {selectedCardActions: {setSelectedCardAction}} = actions

function ShowWorldCards(props){
  const {cards, selectedCard} = props

  const [modalOpen, setModalOpen] = useState(false)
  const [newCardModalOpen, setNewCardModalOpen] = useState(false)

  const id = props.route.params.worldId
  
  const worldCards = () => {
    return cards.filter(card => {
      return card.campaign_id === id
    })
  }

  return(
    <View style={styles.container}>
      <Modal visible={modalOpen} animationType='slide'>
        <View style={styles.infoScreen}>
          <ScrollView>
            <View style = {styles.scroll}>
              <Button title='Close' onPress={()=>{
                setModalOpen(false)
                props.removeSelectedCard()
              }}>
              </Button>
              <Text style = {styles.title}>{selectedCard.name}</Text>
              <Image 
                style={{width: 250, height: 250, resizeMode: 'center'}}
                source={{uri: selectedCard.image}}> 
              </Image>
              <Text style = {styles.short_description}>{selectedCard.short_description}</Text>
              <Text>{selectedCard.text}</Text>
              <Button 
                title='Edit'
                onPress={() => setNewCardModalOpen(true) }>
              </Button>
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
                  props.setSelectedCard(item.id)
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
                  props.setSelectedCard(item.id)
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
          <NewCardForm 
            {...props}
            token = {props.token} 
            id = {id}
            setNewCardModalOpen={setNewCardModalOpen} 
            cardsAction={props.addCardToCards}
          />
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
            <TouchableOpacity 
              onPress={()=> {
                setModalOpen(true)
                props.setSelectedCard(item)
                }}
              onLongPress={() => 
                Alert.alert("Delete This World?",
                  "are you sure?",
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => {
                    props.removeCardFromCards(item)
                    props.route.params.removeCardFromDatabase(item.id)
                  }},
                ]
              )}
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

const mapDispatchToProps = (dispatch) => ({
  removeCardFromCards: (card) => dispatch(removeCardFromCardsAction(card)),
  addCardToCards: (card) => dispatch(addCardToCardsAction(card)),
  setSelectedCard: (card) => dispatch(setSelectedCardAction(card)),
  removeSelectedCard: () => dispatch({type: "REMOVE_SELECTED_CARD"}),
  updateCardInCards: (card) => dispatch(updateCardInCardsAction(card))
})

const mapStateToProps = (state) => ({
  cards: state.cards,
  selectedCard: state.selectedCard
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowWorldCards)

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fffaf0',
    paddingBottom: 0,
    flex: 1
  },
  listContainer:{
    
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
  footer:{
    height: 40
  }
})