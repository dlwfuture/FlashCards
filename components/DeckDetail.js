import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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
    return (
      <View style={styles.container}>
        {
          deck && (
            <View>
              <View style={styles.item}>
                <Text style={styles.deckTitle}>{deck.title && deck.title}</Text>
                <Text style={styles.deckText}>{deck.questions && deck.questions.length} cards</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.whiteButton}>
                    <Text style = {styles.submitButtonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blackButton}>
                    <Text style = {styles.submitButtonText}>Start Quiz</Text>
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
  },
  item: {
    padding: 20,
    height: 160,
    marginLeft: 1,
    marginRight: 1,
    justifyContent: 'center',
},
  deckTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  deckText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 15,
  },
  blackButton: {
    backgroundColor: '#000',
    padding: 10,
    paddingTop: 15,
    margin: 15,
    marginLeft: 100,
    marginRight: 100,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  whiteButton: {
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 15,
    margin: 15,
    marginLeft: 100,
    marginRight: 100,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
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