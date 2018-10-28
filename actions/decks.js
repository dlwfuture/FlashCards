import { saveDeckTitle, getDecks, getDeck } from '../utils/api'

export const GET_DECK = 'GET_DECK'
export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'

export function GetDecks() {
    return (dispatch) => {
        getDecks()
        .then(decks => dispatch({
            type: GET_DECKS,
            decks
        })).catch(error => {
            console.warn(error)
            return {
                type: GET_DECKS,
                decks: null
            }
        })
    }
}

export function GetDeck(id) {
    return (dispatch) => {
        getDeck(id)
        .then(deck => dispatch({
            type: GET_DECK,
            deck
        })).catch(error => {
            console.warn(error)
            return {
                type: GET_DECK,
                deck: null
            }
        })
    }
}

export function AddDeck(title) {
    return (dispatch) => {
        saveDeckTitle(title)
        .then(() => {
            dispatch(GetDeck(title))
            dispatch(GetDecks()) 
        })
        .catch(error => {
            console.warn(error)
        })
    }
}