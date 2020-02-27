import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  name: t.String,
  image: t.String,
  short_description: t.String,
  text: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  textbox: {
    normal: {
      ...Form.stylesheet.textbox.normal,  
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
      flexDirection: 'row' 
    }
  }
}

const options = {
  fields: {
    name: {
      label: 'Card Title',
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
                  height: 400
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