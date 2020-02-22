import React, { Component} from 'react'
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import Logo from '../images/DMMapperLogo.png'
import t from 'tcomb-form-native';

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
      fontWeight: '600'
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

  state = {
    token: "",
    username: "",
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    fetch('http://10.0.0.66:3000/login', {
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
      
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error
    })
  }

  render(){

    return(
      <View style = {styles.container}>
        <Image
          style = {{width: 300, height: 100}}
          source = {Logo}
        />
        <Text style = {styles.text}>
          Welcome to the Dm Mapper, {"\n"} 
        a tool to help create a manage your {"\n"}
        fantasy world! Sign in to begin your {"\n"}
        journey!
        </Text>

        <Form 
          ref={c => this._form = c}
          options={options}
          type={User} />
        <View style={styles.buttons}>
          <Button
            title="Sign In!"
            onPress={this.handleSubmit}
          />
          <Button
            title="Sign Up!"
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
    // alignItems: 'center',
  },
  text: {
    textAlign: "center",
  },
  buttons:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default SignIn