import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
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
  controlLabel: {
    normal: {
      color: 'green',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
      width: 200,
      textAlign: 'center'
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
          textbox: {
              ...Form.stylesheet.textbox,
              normal: {
                  ...Form.stylesheet.textbox.normal,
                  height: 150
              },
              error: {
                  ...Form.stylesheet.textbox.error,
                  height: 150
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
      <View>
        <Button title='Close' onPress={()=>{this.props.setNewCardModalOpen(false)}}></Button>
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fffaf0'
  },
  text: {
    textAlign: "center",
    marginBottom: 20,
  },
  buttonsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
  button: {
    marginLeft: 30,
  }
})