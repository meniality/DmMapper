export const cards = (state=[], action) => {
  switch(action.type){
    case "ADD_CARDS_TO_CARDS":
      return [...state, action.card]
    case "REMOVE_CARD_FROM_CARDS":
      return state.filter(oldCard => {
        return oldCard.id !== action.card.id
      })
    case "SET_INITIAL_CARDS":
      return action.cards
    default:
      return state
  }
}