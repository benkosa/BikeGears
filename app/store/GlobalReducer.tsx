import {
  ADD_FRIEND,
  ADD_USER,
  SET_APIRENCE,
  SET_HOMESCREEN,
  SET_LANGUAGE,
} from "./GlobalActionsTypes";

import { combineReducers } from "redux";

interface InitialState {
  current: Array<string>;
  user: {};
  selectedLanguage: number;
  appLang: string;
  selectedHomeScreen: number;
  selectedApirence: number;
}

const INITIAL_STATE: InitialState = {
  current: [],
  user: {},
  selectedLanguage: 1,
  appLang: "en",
  selectedHomeScreen: 1,
  selectedApirence: 0,
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
    case SET_APIRENCE:
      let newApirenceState = { ...state };

      newApirenceState.selectedApirence = action.payload;

      return newApirenceState;
    case SET_HOMESCREEN:
      let newHomeScreenState = { ...state };

      newHomeScreenState.selectedHomeScreen = action.payload;

      return newHomeScreenState;
    case SET_LANGUAGE:
      const lang: { [key: string]: string } = { "0": "sk", "1": "en" };
      let newLanguageState = { ...state };

      newLanguageState.selectedLanguage = action.payload;
      newLanguageState.appLang = lang[action.payload + ""];

      return newLanguageState;
    default:
      return state;
  }
};

export default combineReducers({
  global: globalReducer,
});
