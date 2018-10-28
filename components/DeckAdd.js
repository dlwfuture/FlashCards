import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AddDeck, GetDecks } from '../actions/decks'

class DeckAdd extends React.Component {
  state = {
    title: null,
  }

  clearScreen = () => {
    this.setState({
      title: null,
    })
  }

  saveDeck = () => {
    if (!this.state.title || !this.state.title.length){
      alert('Title is a mandatory field')
      return
    }
    this.props.AddDeck(this.state.title)
    this.clearScreen()
    this.props.navigation.navigate('DeckDetail',{ DeckId: this.state.title })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <View>
          <TextInput
            placeholder={'Deck Title'}
            style={styles.inputText}
            value={this.state.title}
            onChangeText={(text) => this.setState({title: text})}
          />
        </View>
        <TouchableOpacity
            style = {styles.submitButton}
            onPress={this.saveDeck}
        >
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
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    flexDirection: 'row',
    textAlignVertical: 'center',
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    AddDeck: (title) => dispatch(AddDeck(title)),
    GetDecks: () => dispatch(GetDecks()),
  }
}

const mapStateToProps = ({deck}) => ({
  deck: deck,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckAdd)