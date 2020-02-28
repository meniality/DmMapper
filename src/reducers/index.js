import {combineReducers} from 'redux'
import {worlds} from './worlds'
import {cards} from './cards'

export default combineReducers({
  worlds,
  cards
})