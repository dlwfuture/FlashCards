import React from 'react'
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native'

export default class DeckList extends React.Component {
  deck = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(this.deck).map((id) => this.deck[id])}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => 
            (
              <View style={styles.item}>
                <Text style={styles.deckTitle}>{item.title}</Text>
                <Text style={styles.deckText}>{item.questions.length} cards</Text>
              </View>
            )
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
      backgroundColor: '#fff',
      borderRadius: Platform.OS === 'ios' ? 16 : 2,
      padding: 20,
      height: 160,
      marginLeft: 1,
      marginRight: 1,
      justifyContent: 'center',
      shadowRadius: 3,
      shadowOpacity: 0.8,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
          width: 0,
          heigth: 3,
      },
      borderBottomColor: 'black',
      borderBottomWidth: 1,
  },
  noDataText: {
      fontSize: 20,
      paddingTop: 20,
      paddingBottom: 20,
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
})