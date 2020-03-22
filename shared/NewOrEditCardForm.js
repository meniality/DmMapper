import React, { Component } from 'react'
import {StyleSheet, View, Button, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import t from 'tcomb-form-native';
import {URL} from '../shared/BackendURL'

const Form = t.form.Form;

const User = t.struct({
  name: t.String,
  image: t.maybe(t.String),
  short_description: t.maybe(t.String),
  text: t.maybe(t.String),
  favorite: t.Boolean
});

const formStyles = {
  ...Form.stylesheet,
  textbox: {
    normal: {
      ...Form.stylesheet.textbox.normal,  
      backgroundColor: 'white',
    },
    error: {
      ...Form.stylesheet.textbox.error,
      backgroundColor: 'white',
    }
  },
  controlLabel: {
    normal: {
      color: 'green',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
      textAlign: 'center',
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      margin: 5,
      fontWeight: '600',
      flexShrink: .8,
      textAlign: 'center',

    }
  }
}

const options = {
  fields: {
    name: {
      label: 'Card Title',
      error: 'You need name for a card',
    },
    image: {
      label: 'Image URL'
    },
    text: {
      label: 'Full Card Description',
      multiline: true,
      stylesheet: {
          ...Form.stylesheet,
          controlLabel:{
            normal: {
              color: 'green',
              fontSize: 18,
              marginBottom: 7,
              fontWeight: '600',
              textAlign: 'center',
            },
          },
          textbox: {
              ...Form.stylesheet.textbox,
              normal: {
                  ...Form.stylesheet.textbox.normal,  
                  backgroundColor: 'white',
                  height: 400,
              },
              error: {
                  ...Form.stylesheet.textbox.error,
                  height: 400,
              }
          }
      }
    },
    short_description: {
      label: "Short Description"
    },
    favorite: {
      hidden: true,
    }
  },
  stylesheet: formStyles
};

export default class NewOrEditCardForm extends Component{
  handleSubmit = () => {
    const value = this.refs.form.getValue();
    const cardId = this.props.selectedCard.id
    value 
      ? this.props.selectedCard.name
        ? fetch(`${URL}/update_card`,{
            method: "PATCH",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            authorization: `bearer ${this.props.token}`
            },
            body: JSON.stringify({card: {...value, id: cardId}})
          })
          .then(response => response.json())
          .then(responsejson => {
            this.props.updateCardInCards(responsejson)
            this.props.setSelectedCard(this.findCardObject(cardId))
            this.props.setNewCardModalOpen(false)
          })

        : fetch(`${URL}/cards#campaign_cards`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              authorization: `bearer ${this.props.token}`
            },
            body: JSON.stringify({card:{...value, campaign_id: this.props.world_id}})
          })
          .then(response => response.json())
          .then(responsejson => {
            this.props.cardsAction(responsejson)
            this.props.setNewCardModalOpen(false)
          })
      : console.log("nope")
  }

  handleStarSubmit = () => {
   this.props.updateFavorite(this.props.selectedCard)
    // const value = this.refs.form.getValue();
    // const cardId = this.props.selectedCard.id
    // fetch(`${URL}/update_card`,{
    //   method: "PATCH",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   authorization: `bearer ${this.props.token}`
    //   },
    //   body: JSON.stringify({card: {...value, id: cardId}})
    // })
    // .then(response => response.json())
    // .then(responsejson => {
    //   this.props.updateCardInCards(responsejson)
    //   this.props.setSelectedCard(this.findCardObject(cardId))
    // })
  }

  findCardObject = (id) => {
    const newSecetedCard = this.props.cards.filter(card => {
      return card.id === id
    })
    return newSecetedCard[0]
  }

  isCardFavorite = () => {
    return this.props.selectedCard.favorite
      ? "star"
      : "star-o"
  }



  render(){
    const value = {
      name: this.props.selectedCard.name,
      image: this.props.selectedCard.image,
      short_description: this.props.selectedCard.short_description,
      text: this.props.selectedCard.text,
      favorite: this.props.selectedCard.favorite
    }

    return(  
      <ScrollView>
        <View style = {styles.container}>
          <View style={styles.closeAndFavorite}>
            <View style={styles.closeButton}>
              <Button title='Close' onPress={()=>{this.props.setNewCardModalOpen(false)}}></Button>
            </View>
            <TouchableOpacity 
              style={styles.favoriteIcon}
              onPress = {this.handleStarSubmit}
            >
              <Icon name = {this.isCardFavorite()} size={40} color="#ffd700" />
            </TouchableOpacity>
          </View>
          <Form 
            ref="form"
            options={options}
            value={value}
            type={User} 
          />
            <View style={styles.buttonsContainer}>
              <Button style={styles.button}
                title="Submit"
                onPress={this.handleSubmit}
              />
            </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fffaf0',
    height: 1300,
    overflow: 'scroll',
  },
  closeAndFavorite: {
    height: 60,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  closeButton:{
    justifyContent: 'center',
  },
  favoriteIcon: {
    position: 'absolute',
    alignSelf: 'center',
    right: 10
  },
  buttonsContainer:{
    justifyContent: 'center',
    width: 200,
  },
})