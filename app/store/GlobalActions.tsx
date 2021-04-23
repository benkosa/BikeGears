import {
  ADD_FRIEND,
  ADD_USER,
  SET_APIRENCE,
  SET_HOMESCREEN,
  SET_LANGUAGE,
} from "./GlobalActionsTypes";

export const addFriend = (friendsIndex: string) => ({
  type: ADD_FRIEND,
  payload: friendsIndex,
});

export const addUser = (user: any) => ({
  type: ADD_USER,
  payload: user,
});

export const setLanguage = (language: any) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const setHomeScreen = (homeScreen: number) => ({
  type: SET_HOMESCREEN,
  payload: homeScreen,
});

export const setApirence = (apirence: number) => ({
  type: SET_APIRENCE,
  payload: apirence,
});
