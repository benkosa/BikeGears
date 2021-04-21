import { ADD_FRIEND } from "./GlobalActionsTypes";
import { ADD_USER} from "./GlobalActionsTypes";

import { combineReducers } from "redux";

interface InitialState {
  current: Array<string>;
  user: {}
}

const INITIAL_STATE: InitialState = {
  current: [],
  user: {}
};

const globalReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ADD_FRIEND:
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      let newFriendsState = { ...state };

      // And put friend in friends.current
      newFriendsState.current.push(action.payload);

      // Finally, update the redux state

      return newFriendsState;
    case ADD_USER:
        
      let newUserState = { ...state };

      newUserState.user = action.payload;

      return newUserState;
    default:
      return state;
  }
};

export default combineReducers({
  global: globalReducer,
});
