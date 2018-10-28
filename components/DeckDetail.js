import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { GetDeck } from '../actions/decks'

class DeckDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { DeckId } = navigation.state.params
    
    return {
        title: `${DeckId}`
    }
  }

  componentDidMount() {
    const { DeckId } = this.props.navigation.state.params
    this.props.GetDeck(DeckId)
  }

  render() {
    const { deck } = this.props
    const deckContainsQuestions = deck && deck.questions && deck.questions.length
    return (
      <View style={styles.container}>
        {
          deck && (
            <View>
              <View style={styles.deckHeader}>
                <Text style={styles.deckTitle}>{deck && deck.title}</Text>
                <Text style={styles.deckText}>{deck.questions && deck.questions.length} cards</Text>
              </View>
              <View style={styles.deckBottom}>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#fff'}]} onPress={() => {this.props.navigation.navigate('CardQuestionAdd',{ DeckId: deck.title })}}>
                    <Text style={[styles.buttonText, {color: '#000'}]}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: deckContainsQuestions ? '#000' : '#ddd'}]}>
                    <Text style={[styles.buttonText, {color: '#fff'}]} onPress={() => {deckContainsQuestions && this.props.navigation.navigate('CardQuestion')}}>Start Quiz</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
        {
          !deck && (
            <Text style={styles.noDataText}>
              No deck to show
            </Text>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  deckHeader: {
    padding: 20,
    height: (Dimensions.get('window').height / 3) * 1.5,
    marginLeft: 1,
    marginRight: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckBottom: {
    justifyContent: 'flex-start',
    height: (Dimensions.get('window').height / 3),
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 45,
  },
  deckText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 25,
  },
  button: {
    width: Dimensions.get('window').width * 0.6,
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 20,
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
      GetDeck: (id) => dispatch(GetDeck(id)),
  }
}

const mapStateToProps = ({deck}) => ({
  deck: deck.deck,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail)