import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import t from 'tcomb-form-native';
import URL from '../shared/BackendURL'

const Form = t.form.Form;

const User = t.struct({
  name: t.String,
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
      textAlign: "center"
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
      label: 'World Name',
      error: 'A World Must Have A Name'
    },
  },
  stylesheet: formStyles
};

export default class CreateNewWorld extends Component {

  handleSubmit = () => {
    const value = this.refs.form.getValue();

    fetch(`http://${URL}/campaigns`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          authorization: `bearer ${this.props.token}`
        },
        body: JSON.stringify({campaign:{...value}})
      })
      .then(response => response.json())
      .then(responsejson => {
        this.props.route.params.addNewWorldToWorlds(responsejson)
        this.props.navigation.navigate('Worlds Menu')
      })
  }

  render(){
    return(
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.container}>
          <Text style={styles.text}>Choose A Name For Your New World</Text>
          <View style = {styles.form}>
              <Form
                ref="form"
                options={options}
                type={User} />
                  <Button
                    title="Create World"
                    onPress={this.handleSubmit}
                  />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffaf0',
    flex: 1,
  },
  text:{
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 20,
  },
  form: {
    width: 200,
  }
})