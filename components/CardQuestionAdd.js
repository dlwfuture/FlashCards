import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { AddCard } from '../actions/cards'

class CardQuestionAdd extends React.Component {
  static navigationOptions = () => {
    return {
        title: 'Add Card'
    }
  }

  state = {
    cardQuestion: null,
    cardAnswer: null,
  }

  clearScreen = () => {
    this.setState({
      cardQuestion: null,
      cardAnswer: null,
    })
  }

  isValidCard = () => {
    if (!this.state.cardQuestion || !this.state.cardQuestion.length) {
      alert('Question is a mandatory field!')
      return false
    }
    if (!this.state.cardAnswer || !this.state.cardAnswer.length) {
      alert('Answer is a mandatory field!')
      return false
    }
    return true
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  saveCardToDeck = () => {
    const { DeckId } = this.props.navigation.state.params
    if (this.isValidCard()) {
      this.props.AddCard(DeckId, {
        question: this.state.cardQuestion,
        answer: this.state.cardAnswer,
      })
      this.toHome()
      this.clearScreen()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder={'Question'}
            style={styles.inputText}
            value={this.state.cardQuestion}
            onChangeText={(text) => this.setState({cardQuestion: text})}
          />
          <TextInput
            placeholder={'Answer'}
            style={styles.inputText}
            value={this.state.cardAnswer}
            onChangeText={(text) => this.setState({cardAnswer: text})}
          />
        </View>
        <TouchableOpacity
            style = {styles.submitButton}
            onPress={this.saveCardToDeck}
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
    AddCard: (title, card) => dispatch(AddCard(title, card)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CardQuestionAdd)