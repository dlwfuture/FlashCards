import { addCardToDeck } from '../utils/api'
import { GetDeck, GetDecks } from './decks'

export const ADD_CARD = 'ADD_CARD'

export function AddCard(title, card) {
    return (dispatch) => {
        addCardToDeck(title, card)
        .then((title) => {
            dispatch(GetDeck(title))
            dispatch(GetDecks())
        })
        .catch(error => {
            console.warn(error)
        })
    }
}