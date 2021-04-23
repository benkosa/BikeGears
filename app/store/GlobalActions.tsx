import { ADD_FRIEND, ADD_USER } from "./GlobalActionsTypes";

export const addFriend = (friendsIndex: string) => ({
  type: ADD_FRIEND,
  payload: friendsIndex,
});

export const addUser = (user: any) => ({
  type: ADD_USER,
  payload: user,
});

export const setLanguage = (language: any) => ({
  type: ADD_USER,
  payload: language,
});

export const setHomeScreen = (gomeScreen: any) => ({
  type: ADD_USER,
  payload: gomeScreen,
});

export const setApirence = (apirence: any) => ({
  type: ADD_USER,
  payload: apirence,
});
