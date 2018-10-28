import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'
import uuidv1 from 'uuid/v1'

const LOCAL_STORAGE_KEY = 'FlashCardsLocal'
const NOTIFICATION_KEY = 'FlashCardsNotification'

export function getDecks () {
    return AsyncStorage.getItem(LOCAL_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
}

export function getDeck (id) {
    return AsyncStorage.getItem(LOCAL_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
        .then(decks => decks[id] || {})
}

export function saveDeckTitle (title) {
    return AsyncStorage.getItem(LOCAL_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
        .then(decks => {
            decks[title] = {
                'title': title,
                questions: []
            }
            AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(decks))
            return title
        })
}

export function addCardToDeck (title, card) {
    return AsyncStorage.getItem(LOCAL_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
        .then(decks => {
            if (decks[title]) {
                decks[title].questions.push(card)
                AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(decks))
                return title
            }
        })
}

function createNotification() {
    return {
      title: 'Complete your quiz',
      body: 'Don\'t forget to complete a quiz for today!',
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(data => JSON.parse(data))
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
              if (status === 'granted'){
                Notifications.cancelAllScheduledNotificationsAsync
                let dateToNotify = new Date()
                dateToNotify.setDate(dateToNotify.getDate() + 1)
                dateToNotify.setHours(20)
                dateToNotify.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: dateToNotify,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }