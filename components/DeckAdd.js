import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

export default class DeckAdd extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <View>
          <TextInput
            placeholder={'Deck Title'}
            style={styles.inputText}
            value={'test'}
          />
        </View>
        <TouchableOpacity
            style = {styles.submitButton}>
            <Text style = {styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputText: {
    height: 50, 
    margin: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#000', 
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 10,
    margin: 15,
    marginLeft: 100,
    marginRight: 100,
    height: 40,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    flexDirection: 'row',
    textAlignVertical: 'center',
  }
})