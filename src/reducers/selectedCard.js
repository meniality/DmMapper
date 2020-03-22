export const selectedCard = (state={}, action) => {
  switch(action.type){
    case "REMOVE_SELECTED_CARD":
      return {}
    case "SET_SELECTED_CARD":
      return action.card
    case "UPDATE_FAVORITE":
      var newCard = action.card
      newCard.favorite = !newCard.favorite
      return newCard
    default:
      return state
  }
}