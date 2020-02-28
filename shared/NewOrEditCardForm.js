import React, { Component } from 'react'
import {StyleSheet, View, Button, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import t from 'tcomb-form-native';
import {URL} from '../shared/BackendURL'

const Form = t.form.Form;

const User = t.struct({
  name: t.String,
  image: t.maybe(t.String),
  short_description: t.maybe(t.String),
  text: t.maybe(t.String),
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
      width: 300,
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
              width: 300,
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
  },
  stylesheet: formStyles
};

export default class NewOrEditCardForm extends Component{
  handleSubmit = () => {
    const value = this.refs.form.getValue();
    
    value
    ? fetch(`http://${URL}/cards#campaign_cards`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: `bearer ${this.props.token}`
          },
          body: JSON.stringify({card:{...value, campaign_id: this.props.id}})
        })
        .then(response => response.json())
        .then(responsejson => {
          this.props.cardsAction(responsejson)
          this.props.setNewCardModalOpen(false)
        })
    : console.log("nope")
  }

  render(){
    return(
      <ScrollView>
        <View style = {styles.container}>
          <View style={styles.closeButton}>
            <Button title='Close' onPress={()=>{this.props.setNewCardModalOpen(false)}}></Button>
          </View>
          <Form 
              ref="form"
              options={options}
              type={User} />
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
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fffaf0',
    height: 1300,
    overflow: 'scroll',
  },
  closeButton: {
    height: 60
  },
  buttonsContainer:{
    justifyContent: 'center',
    width: 200,
  },
})