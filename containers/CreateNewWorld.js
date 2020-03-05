import React, { useRef } from 'react'
import {StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import t from 'tcomb-form-native';
import { URL } from '../shared/BackendURL'
import {connect} from 'react-redux'
import actions from '../src/actions'

const {worldsActions: {addWorldToWorldsAction}} = actions

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

function CreateNewWorld(props) {  

  const formdata = useRef(null)

  const handleSubmit = () => {
    const value = formdata.current.getValue();

    value
      ? fetch(`http://${URL}/campaigns`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: `bearer ${props.token}`
          },
          body: JSON.stringify({campaign:{...value}})
        })
        .then(response => response.json())
        .then(responsejson => {
          props.addWorldToWorlds(responsejson)
          props.navigation.navigate('Worlds Menu')
        })
      : null
  }
  return(
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Choose A Name For Your New World</Text>
          <View style = {styles.form}>
            <Form
              ref={formdata}
              options={options}
              type={User} />
              <Button
                title="Create World"
                onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
    )
  }


const mapStateToProps = () => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  addWorldToWorlds: (world) => dispatch(addWorldToWorldsAction(world))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewWorld)

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    backgroundColor: '#fffaf0',
    flex: 1,
    height: 1000,
    paddingTop: 200
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