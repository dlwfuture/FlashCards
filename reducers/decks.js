import { GET_DECKS, GET_DECK } from '../actions/decks'

export function decks(state = {}, action) {
    switch(action.type) {
        case GET_DECKS:
            return { decks: action.decks }
        case GET_DECK:
            return { deck: action.deck }
        default: 
            return state
    }
}