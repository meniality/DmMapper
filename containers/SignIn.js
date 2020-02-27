import React, { Component} from 'react'
import {StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Logo from '../images/DMMapperLogo.png'
import t from 'tcomb-form-native';
import URL from '../shared/BackendURL'

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
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

class SignIn extends Component {
  handleSubmit = () => {
    const value = this.refs.form.getValue();
    fetch(`http://${URL}/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    .then(response => response.json())
    .then(responsejson => {
      this.props.setUsername(responsejson.username)
      this.props.setToken(responsejson.token)
      if (responsejson.token){
         this.props.navigation.navigate('MainMenu')}
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error
    })
  }

  render(){
    return(
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style = {styles.container}>
          <Image
            style = {{width: 300, height: 100}}
            source = {Logo}
          />
          <Text style = {styles.text}>
            Welcome to the Dm Mapper, {"\n"} 
            a tool to help create and manage your {"\n"}
            fantasy world! Sign in to begin your {"\n"}
            journey!
          </Text>

          <Form 
            ref="form"
            options={options}
            type={User} />
          <View style={styles.buttonsContainer}>
            <Button style={styles.button}
              title="Sign In!"
              onPress={this.handleSubmit}
            />
            <Button style={styles.button}
              title="Sign Up!"
              onPress={() => {this.props.navigation.navigate('Create New User')}}
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

export default SignIn