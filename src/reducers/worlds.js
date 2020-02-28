export const worlds = (state=[], action) => {
  switch(action.type){
    case "REMOVE_WORLD_FROM_WORLDS":
      return state.filter(oldWorld => {
        return oldWorld.id !== action.world.id
      })
    case "ADD_WORLD_TO_WORLDS":
      return [...state, action.world]
    case "SET_INITIAL_WORLDS":
      return action.worlds
    default:
      return state
  }
}