import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { setLocalNotification } from '../utils/api'

class Question extends React.Component {
  static navigationOptions = () => {
    return {
        title: 'Quiz'
    }
  }

  state = {
    totalQuestions: 0,
    currentQuestion: 1,
    showAnswer: false,
    isQuestionAnswered: false,
    totalCorrect: 0,
    totalWrong: 0,
  }

  refreshScreen = () => {
    this.setState({
      totalQuestions: this.props.deck && this.props.deck.questions ? this.props.deck.questions.length : 0,
      currentQuestion: 1,
      showAnswer: false,
      isQuestionAnswered: false,
      totalCorrect: 0,
      totalWrong: 0
    })
  }

  componentDidMount() {
    this.refreshScreen()
  }

  correctAnswer = () => {
    if (this.state.isQuestionAnswered){
      return
    }
    this.setState(state => ({
      totalCorrect: state.totalCorrect += 1,
      isQuestionAnswered: true,
    }))
  }

  wrongAnswer = () => {
    if (this.state.isQuestionAnswered){
      return
    }
    this.setState(state = ({
      totalWrong: this.state.totalWrong += 1,
      isQuestionAnswered: true,
    }))
  }

  goToAnswer = () => {
    this.setState({
      showAnswer: true
    })
  }

  goToNextQuestion = () => {
    if (this.state.currentQuestion !== this.state.totalQuestions) {
      this.setState(state => ({
        showAnswer: false,
        isQuestionAnswered: false,
        currentQuestion: state.currentQuestion += 1
      }))
    }
    else {
      setLocalNotification()
      const { totalCorrect, totalQuestions } = this.state
      const deckTitle = this.props.deck.title
      this.refreshScreen()
      this.props.navigation.navigate(
        'CardQuestionResult',
        { 
          TotalCorrect: totalCorrect,
          TotalQuestions: totalQuestions,
          DeckId: deckTitle
        }
      )
    }
  }

  render() {
    const { 
      totalQuestions,
      currentQuestion,
      showAnswer,
      isQuestionAnswered,
    } = this.state

    const { deck } = this.props
    const question = deck.questions ? deck.questions[currentQuestion - 1] : null
    const isLastQuestion = this.state.currentQuestion === this.state.totalQuestions

    return (
      <View style={styles.container}>
        {
          question && (
            <View>
              <View>
                <Text style={styles.questionCounter}>
                  {`${currentQuestion}/${totalQuestions}`}
                </Text>
              </View>
              {
                !showAnswer && (
                  <View style={styles.questionContent}>
                    <Text style={styles.questionText}>{question.question}</Text>
                    <TouchableOpacity onPress={this.goToAnswer}>
                      <Text style={styles.linkButton}>Show Answer</Text>
                    </TouchableOpacity>
                  </View>
                ) 
              }
              {
                showAnswer && (
                  <View>
                    <View style={styles.answerContent}>
                      <Text style={styles.questionText}>{question.answer}</Text>
                      {
                        isQuestionAnswered && (
                          <TouchableOpacity onPress={this.goToNextQuestion}>
                            <Text style={styles.linkButton}>{isLastQuestion ? 'Show Score' : 'Next Question'}</Text>
                          </TouchableOpacity>
                        )
                      }
                    </View>
                    <View style={styles.bottomButtonHolder}>
                      <TouchableOpacity style={[styles.button, {backgroundColor: '#0d0'}]} onPress={this.correctAnswer}>
                          <Text style={[styles.buttonText, {color: '#fff'}]}>Correct</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.button, {backgroundColor: '#d00'}]} onPress={this.wrongAnswer}>
                          <Text style={[styles.buttonText, {color: '#fff'}]}>Incorrect</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }
            </View>
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
  questionCounter: {
    fontSize: 25,
    margin: 10,
  },
  questionContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: (Dimensions.get('window').height / 3) * 1.7
  },
  answerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: (Dimensions.get('window').height / 3) * 1.3
  },
  questionText: {
    fontSize: 50,
    textAlign: 'center',
  },
  bottomButtonHolder: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkButton: {
    color: '#f00',
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 0.7,
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
  }
})

const mapStateToProps = ({deck}) => ({
  deck: deck.deck,
})

export default connect(
  mapStateToProps,
  null
)(Question)