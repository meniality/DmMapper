import React, {useState} from 'react'
import {StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Modal, Image, Alert} from 'react-native'
import Card from '../shared/Card'
import AddRelationshipButton from '../componets/AddRelationshipButton'
import { ScrollView } from 'react-native-gesture-handler'
import NewOrEditCardForm from '../shared/NewOrEditCardForm'
import AddNewRelationshipModal from '../shared/AddNewRelationshipModal'
import {connect} from 'react-redux'
import { SearchBar } from 'react-native-elements'
import actions from '../src/actions'
import {URL} from '../shared/BackendURL'
import Icon from 'react-native-vector-icons/FontAwesome';

const {cardsActions: {removeCardFromCardsAction, 
                      addCardToCardsAction, 
                      updateCardInCardsAction, 
                      addRelationshipAction,
                      removeRelationshipAction
                      }} = actions
const {selectedCardActions: {setSelectedCardAction, updateFavoriteAction}} = actions

function ShowWorldCards(props){
  const {cards, selectedCard} = props

  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [newCardModalOpen, setNewCardModalOpen] = useState(false)
  const [addRelationshipModalOpen, setAddRelationshipModalOpen] = useState(false)
  const [relationshipType, setRelationshipType] = useState("")

  const world_id = props.route.params.worldId
  
  const worldCards = () => {
    return cards.filter(card => {
      return card.campaign_id === world_id
    })
  }
  
  const searchCards = () => {
    const favoriteCards = worldCards().filter(card => {
      return card.favorite == true && card.name.includes(search)
    })
    const nonFavoriteCards = worldCards().filter(card => {
      return card.favorite == false && card.name.includes(search)
    })


    return favoriteCards.concat(nonFavoriteCards)
  }

  const findCardObject = (id) => {
    const newSecetedCard = cards.filter(card => {
      return card.id === id
    })
    return newSecetedCard[0]
  }

  const determineFavorite = (item) => {
    return item.favorite
      ? "star"
      : "star-o"
  }

  const removeRelationshipFetch = (parentId, childId) => {
    const parent_card_id = 
      parentId
        ? parentId
        : selectedCard.id
    const child_card_id = 
      parentId
        ? selectedCard.id
        : childId

    fetch(`${URL}/destroy_relationship`, {
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
              <Text style = {styles.title}>{props.selectedCard.name}</Text>
              <Image 
                style={{width: 250, height: 250, resizeMode: 'center'}}
                source={{uri: props.selectedCard.image}}> 
              </Image>
              <Text style = {styles.short_description}>{props.selectedCard.short_description}</Text>
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
              ListFooterComponent={
                <TouchableOpacity 
                  onPress={()=>{
                    setRelationshipType("Parent")
                    setAddRelationshipModalOpen(true)
                  }}
                >
                  <AddRelationshipButton />
                </TouchableOpacity>
              }
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={()=> {
                    props.setSelectedCard(findCardObject(item.id))
                  }}
                  onLongPress={() => 
                    Alert.alert("Delete This Relationship?",
                      "are you sure?",
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => {
                        removeRelationshipFetch(item.id, null)
                        props.removeRelationship(item.id, selectedCard.id)
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
          <Text style={styles.cardLabels}>Child Cards:</Text>
            <FlatList
              horizontal={true}
              data={selectedCard.childCards}
              ListFooterComponent={
                <TouchableOpacity onPress={()=>{
                  setAddRelationshipModalOpen(true)
                  setRelationshipType("Child")
                }}>
                  <AddRelationshipButton />
                </TouchableOpacity>
                  }
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={()=> {
                    props.setSelectedCard(findCardObject(item.id))
                  }}
                  onLongPress={() => 
                    Alert.alert("Delete This Relationship?",
                      "are you sure?",
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => {
                        removeRelationshipFetch(null, item.id)
                        props.removeRelationship(selectedCard.id, item.id)
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
        </Modal>


        <Modal visible={newCardModalOpen} animationType='slide'>
          <NewOrEditCardForm 
            {...props}
            token = {props.token} 
            world_id = {world_id}
            setNewCardModalOpen={setNewCardModalOpen} 
            cardsAction={props.addCardToCards}
            updateFavorite={props.updateFavorite}
          />
        </Modal>   

        <Modal visible={addRelationshipModalOpen} animationType='slide'>
          <AddNewRelationshipModal 
            {...props}
            token = {props.token} 
            world_id = {world_id}
            setAddRelationshipModalOpen={setAddRelationshipModalOpen}
            relationshipType = {relationshipType} 
          />
        </Modal>            

        <SearchBar
          placeholder="Type Here..."
          onChangeText={setSearch}
          value = {search}
        />
        <FlatList
          data={searchCards()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={()=> {
                setModalOpen(true)
                props.setSelectedCard(item)
                }}
              onLongPress={() => 
                Alert.alert("Delete This Card?",
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
                <View style={styles.cardContainer}>
                  <Text>{item.name}</Text>
                  <Icon name = {determineFavorite(item)} size={40} color="#ffd700" />
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={() => setNewCardModalOpen(true)}>
          <Card>
            <View style={styles.addButtonView}>
              <Image style={styles.image}source={require('../images/AddButton.png')}/>
            </View>
          </Card>
        </TouchableOpacity>   
    </View>
  )
}

const mapDispatchToProps = (dispatch) => ({
  removeCardFromCards: (card) => dispatch(removeCardFromCardsAction(card)),
  addCardToCards: (card) => dispatch(addCardToCardsAction(card)),
  setSelectedCard: (card) => dispatch(setSelectedCardAction(card)),
  updateFavorite: (card) => dispatch(updateFavoriteAction(card)),
  removeSelectedCard: () => dispatch({type: "REMOVE_SELECTED_CARD"}),
  updateCardInCards: (card) => dispatch(updateCardInCardsAction(card)),
  addRelationship: (parentId, childId) => dispatch(addRelationshipAction(parentId, childId)),
  removeRelationship: (parentId, childId) => dispatch(removeRelationshipAction(parentId, childId))
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
    flex: 1,
    paddingTop:10
  },
  listContainer:{
    
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fffaf0',
    paddingTop:10
  },
  scroll: {
    alignItems: "center",
  },
  infoScreen: {
    flex: 2.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fffaf0',
    paddingTop:10
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
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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