const setInitialWorldsAction = (worlds) => ({type: 'SET_INITIAL_WORLDS', worlds})

const addWorldToWorldsAction = (world) => ({type: 'ADD_WORLD_TO_WORLDS', world})

const removeWorldFromWorldsAction = (world) => ({type: "REMOVE_WORLD_FROM_WORLDS", world})

export const worldsActions = {
  setInitialWorldsAction,
  addWorldToWorldsAction,
  removeWorldFromWorldsAction
}