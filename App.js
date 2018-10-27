import React from 'react'
import { StyleSheet, View, StatusBar, Text } from 'react-native'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Constants } from 'expo'
import reducer from './reducers/App'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import DeckAdd from './components/DeckAdd'
import CardQuestionAdd from './components/CardQuestionAdd'

function DeckStatusBar({ backgroundColor, ...props }){
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator(
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
      },
    }  
  },
  CardQuestionAdd: {
    screen: CardQuestionAdd,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000',
      },
    }  
  }
})

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk, logger)
  )
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DeckStatusBar backgroundColor={'#000'} barStyle='light-content'/>
          <MainNavigator/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
