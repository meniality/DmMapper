import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SignIn from './containers/SignIn'



export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SignIn />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

});
