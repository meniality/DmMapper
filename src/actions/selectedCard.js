const setSelectedCardAction = (card) => ({type: "SET_SELECTED_CARD", card})
const updateFavoriteAction = (card) => ({type: "UPDATE_FAVORITE", card})


export const selectedCardActions = {
  setSelectedCardAction,
  updateFavoriteAction
}