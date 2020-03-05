const setInitialCardsAction = (cards) => ({type: "SET_INITIAL_CARDS", cards})

const removeCardFromCardsAction = (card) => ({type: "REMOVE_CARD_FROM_CARDS", card})

const addCardToCardsAction = (card) => ({type: "ADD_CARDS_TO_CARDS", card})

const updateCardInCardsAction = (card) => ({type: "UPDATE_CARD_IN_CARDS", card})

const addRelationshipAction = (parentId, childId) => ({type: "ADD_RELATIONSHIP", parentId, childId})

const removeRelationshipAction = (parentId, childId) => ({type: "REMOVE_RELATIONSHIP", parentId, childId})

export const cardsActions = {
  setInitialCardsAction,
  removeCardFromCardsAction,
  addCardToCardsAction,
  updateCardInCardsAction,
  addRelationshipAction,
  removeRelationshipAction
}