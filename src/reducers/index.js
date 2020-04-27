import {combineReducers} from 'redux'
import {worlds} from './worlds'
import {cards} from './cards'
import {selectedCard} from './selectedCard'

export default combineReducers({
  worlds,
  cards,
  selectedCard
})