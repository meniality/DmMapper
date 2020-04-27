export const cards = (state=[], action) => {
  switch(action.type){
    case "UPDATE_CARD_IN_CARDS":
      const filteredCards = state.filter(filteredCard => {
        return filteredCard.id !== action.card.id
      })
      const updatedCard = state.filter(secondfilteredCard => {
        return secondfilteredCard.id === action.card.id
      })[0]
      updatedCard.name = action.card.name
      updatedCard.image = action.card.image
      updatedCard.short_description = action.card.short_description
      updatedCard.text = action.card.text
      updatedCard.childCards = action.card.childCards
      updatedCard.parentCards = action.card.parentCards
      return [...filteredCards, updatedCard]
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