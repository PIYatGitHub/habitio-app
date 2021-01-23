import { IUser, IUserStateAction } from "../constants/interfaces";

// Initial State
const emptyTags: number[] = []
export const emptyUser: IUser = {
    userId: 0, 
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    preferredTags: emptyTags
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
          // State
          ...state,
          // Redux Store
          loggedIn: action.loggedIn,
          user: action.user
        }
      }
      case 'LOGOUT': {
        return {
          // State
          ...state,
          // Redux Store
          loggedIn: action.loggedIn,
          user: emptyUser
        }
      }
      case 'SET_TAGS': {
        const user:IUser = Object.assign([], state.user); 
        user.preferredTags = Object.assign([], action.user.preferredTags); 

        return {
          // State
          ...state,
          // Redux Store
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