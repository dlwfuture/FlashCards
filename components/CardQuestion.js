import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

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

  componentDidMount() {

  }

  correctAnswer = () => {
    this.setState(state => ({
      totalCorrect: state.totalCorrect++,
      isQuestionAnswered: true,
    }))
  }

  wrongAnswer = () => {
    this.setState({
      totalWrong: 1,
      isQuestionAnswered: true,
    })
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
        currentQuestion: state.currentQuestion++
      }))
    }
  }

  render() {
    const { 
      totalQuestions,
      currentQuestion,
      showAnswer,
    } = this.state

    const { deck } = this.props
    const question = deck.questions ? deck.questions[currentQuestion] : null

    return (
      <View style={styles.container}>
        {
          question && (
            <View>
              <View>
                <Text>
                  {`${currentQuestion}/${totalQuestions}`}
                </Text>
              </View>
              {
                !showAnswer && (
                  <View>
                    <Text>{question.question}</Text>
                    <TouchableOpacity onPress={this.goToAnswer}>
                      <Text>Answer</Text>
                    </TouchableOpacity>
                  </View>
                ) 
              }
              {
                showAnswer && (
                  <View>
                    <View>
                      <Text>{question.answer}</Text>
                      {
                        isQuestionAnswered && (
                          <TouchableOpacity onPress={this.goToNextQuestion}>
                            <Text>Question</Text>
                          </TouchableOpacity>
                        )
                      }
                    </View>
                    <View>
                      <TouchableOpacity style={[styles.button, {backgroundColor: '#fff'}]} onPress={this.correctAnswer}>
                          <Text style={[styles.buttonText, {color: '#000'}]}>Correct</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.button, {backgroundColor: '#000'}]} onPress={this.wrongAnswer}>
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
  },
})

const mapStateToProps = ({deck}) => ({
  deck: deck.deck,
})

export default connect(
  mapStateToProps,
  null
)(Question)