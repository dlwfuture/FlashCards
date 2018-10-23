import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Question extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})