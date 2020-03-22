export const cards = (state=[], action) => {
  switch(action.type){
    case "ADD_RELATIONSHIP":
      const parentObject = state.find(card => { 
        return card.id === action.parentId
      })
      const childObject = state.find(card => {
        return card.id === action.childId
      })
      
      const parentObjectWOChildren = Object.assign({}, parentObject)
      const childObjectWOChildren = Object.assign({}, childObject)
      
      delete parentObjectWOChildren.childCards
      delete parentObjectWOChildren.parentCards
      delete childObjectWOChildren.childCards
      delete childObjectWOChildren.parentCards

      const newState = state.filter(card => {
        return card.id !== action.parentId 
      })

      const newNewState= newState.filter(card =>{
        return card.id !== action.childId
      })
      parentObject.childCards
        ? parentObject.childCards = [...parentObject.childCards, childObjectWOChildren]
        : parentObject.childCards = [childObjectWOChildren]
      childObject.parentCards 
        ? childObject.parentCards = [...childObject.parentCards, parentObjectWOChildren]
        : childObject.parentCards = [parentObjectWOChildren]

      return [...newNewState, parentObject, childObject]
    case "REMOVE_RELATIONSHIP":
      const removeParentObject = state.find(card => { 
        return card.id === action.parentId
      })
      const removeChildObject = state.find(card => {
        return card.id === action.childId
      })
      removeParentObject.childCards = removeParentObject.childCards.filter(childCard => {
        return childCard.id !== action.childId
      })
      removeChildObject.parentCards = removeChildObject.parentCards.filter(parentCard => {
        return parentCard.id !== action.parentId
      })
      const removeNewState = state.filter(card => {
        return card.id !== action.parentId 
      })
      const removeNewNewState= removeNewState.filter(card =>{
        return card.id !== action.childId
      })
      
      return [...removeNewNewState, removeParentObject, removeChildObject]
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
      updatedCard.favorite = action.card.favorite
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