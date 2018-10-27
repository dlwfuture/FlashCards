import { GET_DECKS, GET_DECK } from '../actions/decks'

export function decks(state = {}, action) {
    switch(action.type) {
        case GET_DECKS:
            return { decks: action.decks }
        default: 
            return state
    }
}

export function deck(state = {}, action){
    switch(action.type) {
        case GET_DECK:
            return { deck: action.deck }
        default: 
            return state
    }
}