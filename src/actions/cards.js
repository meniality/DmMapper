const setInitialCardsAction = (cards) => ({type: "SET_INITIAL_CARDS", cards})

const removeCardFromCardsAction = (card) => ({type: "REMOVE_CARD_FROM_CARDS", card})

const addCardToCardsAction = (card) => ({type: "ADD_CARDS_TO_CARDS", card})

export const cardsActions = {
  setInitialCardsAction,
  removeCardFromCardsAction,
  addCardToCardsAction
}