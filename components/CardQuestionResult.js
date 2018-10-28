import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default class CardQuestionResult extends React.Component {
    state = {
        totalQuestions: null,
        totalCorrect: null,
        deckId: null,
    }

    static navigationOptions = () => {
        return {
            title: 'Results'
        }
    }

    componentDidMount() {
        const { TotalQuestions, TotalCorrect, DeckId } = this.props.navigation.state.params
        this.setState({
            totalQuestions: TotalQuestions,
            totalCorrect: TotalCorrect,
            deckId: DeckId
        })
    }

    returnPercentage = (scored, total) => {
        if (!scored){
            return 0
        }

        return Math.floor((scored / total) * 100)
    }

    render() {
    const { totalCorrect, totalQuestions } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`You scored ${totalCorrect} of ${totalQuestions}`}</Text>
                <View style={styles.percentageHolder}>
                    <Text style={styles.percentage}>
                        {`${this.returnPercentage(totalCorrect, totalQuestions)}%`}
                    </Text>
                </View>
                <View style={styles.resultBottom}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: '#fff'}]} onPress={() => {this.props.navigation.navigate('CardQuestion')}}>
                        <Text style={[styles.buttonText, {color: '#000'}]}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: '#000'}]}>
                        <Text style={[styles.buttonText, {color: '#fff'}]} onPress={() => {this.props.navigation.navigate('DeckDetail',{ DeckId: this.state.deckId })}}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    padding: 20,
    margin: 10,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
  },
  percentageHolder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  percentage: {
      fontSize: 130,
      color: '#000',
      textAlign: 'center',
  },
  resultBottom: {
      marginTop: 30,
  }
})