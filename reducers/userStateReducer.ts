import { IHabit, IUser, IUserStateAction } from "../constants/interfaces";

// Initial State
const emptyTags: number[] = []
const emptyHabits: IHabit[] = [];
const emptyMotivation: number[] = []; 
export const emptyUser: IUser = {
    userId: 0, 
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    preferredTags: emptyTags,
    habits: emptyHabits,
    motivation: emptyMotivation
}


const initialState = {
    loggedIn: false,
    user: emptyUser
  };
  // Reducers (Modifies The State And Returns A New State)
  const userReducer = (state = initialState, action: IUserStateAction) => {
    switch (action.type) {
      case 'LOGIN': {
        return {
          ...state,
          loggedIn: action.loggedIn,
          user: action.user
        }
      }
      case 'LOGOUT': {
        return {
          ...state,
          loggedIn: action.loggedIn,
          user: emptyUser
        }
      }
      case 'SET_TAGS': {
        const user:IUser = Object.assign([], state.user); 
        user.preferredTags = Object.assign([], action.user.preferredTags); 
        console.log(`setting user tags!`, action.user.preferredTags);
        
        return {
          ...state,
          user: user
        }
      }
      case 'SET_MOTIVATION': {
        const user:IUser = Object.assign([], state.user); 
        user.motivation = Object.assign([], action.user.motivation); 
        console.log(`setting user motivation!`, action.user.motivation);
        
        return {
          ...state,
          user: user
        }
      }
      case 'SET_HABITS': {
          const user:IUser = Object.assign([], state.user); 
          user.habits = Object.assign([], action.user.habits); 
          console.log(`setting user habits!`, action.user.habits);
          
          return {
            ...state,
            user: user
          }
      }
      default: {
        return state;
      }
    }
  };
  // Exports
  export default userReducer;