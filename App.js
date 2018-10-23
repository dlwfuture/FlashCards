import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { createStackNavigator, createTabNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import DeckAdd from './components/DeckAdd'

function DeckStatusBar({ backgroundColor, ...props }){
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createTabNavigator(
  {
    "DECKS": DeckList,
    "NEW DECK": DeckAdd,
  },
  {
    tabBarOptions: {
      showIcon: false,
      activeTintColor: '#000',
      inactiveTintColor: '#ccc',
      style: {
        height: 56,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
)

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000',
      }
    }  
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DeckStatusBar backgroundColor={'#000'} barStyle='light-content'/>
        <MainNavigator/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
