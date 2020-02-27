import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Logo from '../images/DMMapperLogo.png'
import t from 'tcomb-form-native';
import URL from '../shared/BackendURL'

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
  verifyPassword: t.String,
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
    terms: {
      label: 'Agree to Terms',
    },
    username: {
      error: 'You need to enter a username'
    },
    password: {
      error: 'You need to enter a password'
    },
  },
  stylesheet: formStyles
};

export default class CreateNewUser extends Component{

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if (value && value.password == value.verifyPassword){
      fetch(`http://${URL}/users`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user:{...value}})
      })
      .then(response => response.json())
      .then(responsejson => {
        responsejson.username
          ? this.props.navigation.navigate('SignIn')
          : null
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error
      })
    }
    else {
      alert(
        'Passwords must match.'
      )
    }
  }
  
  render(){
    return(
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.container}>
          <Image
            style = {{width: 300, height: 100}}
            source = {Logo}
          />
          <Text style={styles.text}>
            Please enter your information {"\n"}
            to begin your journey.
          </Text>
          <View style = {styles.form}>
            <Form
              ref="form"
              options={options}
              type={User} />
                <Button
                  title="Create User"
                  onPress={this.handleSubmit}
                />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
  },
  text:{
    textAlign: "center",
    paddingBottom: 20,
  },
  form:{
    width: 200,
  }
})