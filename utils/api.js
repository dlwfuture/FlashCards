import { AsyncStorage } from 'react-native'
import uuidv1 from 'uuid/v1'

const LOCAL_STORAGE_KEY = 'FlashCardsLocal111'

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
        })
}

export function addCardToDeck (title, card) {
    return AsyncStorage.getItem(LOCAL_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
        .then(decks => {
            if (decks[title]) {
                decks[title].questions.push(card)
                AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(decks))
            }
        })
}