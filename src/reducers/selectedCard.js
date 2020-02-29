export const selectedCard = (state=[], action) => {
  switch(action.type){
    case "REMOVE_SELECTED_CARD":
      return {}
    case "SET_SELECTED_CARD":
      return action.card
    default:
      return state
  }
}