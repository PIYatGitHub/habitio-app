// Imports: Dependencies

import { combineReducers } from 'redux';
import userReducer from './userStateReducer';

// Imports: Reducers


// Redux: Root Reducer
const rootReducer = combineReducers<typeof userReducer>({
  authReducer: userReducer
});
// Exports
export default rootReducer;