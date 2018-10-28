import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, Platform, TouchableOpacity } from 'react-native'
import { GetDecks } from '../actions/decks'

class DeckList extends React.Component {
  componentDidMount() {
    this.props.GetDecks()
  }

  goToDeckDetail = (id) => {
    this.props.navigation.navigate(
        'DeckDetail',
        { DeckId: id }
    )
  }

  render() {
    const decks = this.props.decks ? Object.keys(this.props.decks) : null
    const containsDeck = decks && decks.length
    return (
      <View style={styles.container}>
        {
          containsDeck && (
            <FlatList
              data={Object.keys(this.props.decks).map((id) => this.props.decks[id])}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => 
                (
                  <TouchableOpacity onPress={() => {item.title && this.goToDeckDetail(item.title)}}>
                    <View style={styles.item}>
                      <Text style={styles.deckTitle}>{item.title && item.title}</Text>
                      <Text style={styles.deckText}>{item.questions && item.questions.length} cards</Text>
                    </View>
                  </TouchableOpacity>
                )
              }
            />
          ) || (
            <Text style={styles.noDataText}>
              No decks to show
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
    fontSize: 13,
  },
})

const mapDispatchToProps = (dispatch) => {
  return {
      GetDecks: () => dispatch(GetDecks()),
  }
}

const mapStateToProps = ({decks}) => ({
  decks: decks.decks,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList)