import { AsyncStorage } from 'react-native'
import uuidv1 from 'uuid/v1'

const LOCAL_STORAGE_KEY = process.env.LOCAL_STORAGE_KEY

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
    let decks = AsyncStorage.getItem(LOCAL_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
    decks[title] = {
        title,
        questions: []
    }
    AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(decks))
}

export function addCardToDeck (title, card) {
    let decks = AsyncStorage.getItem(LOCAL_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
    if (decks[title]) {
        decks[title].questions.push(card)
        AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(decks))
    }
}