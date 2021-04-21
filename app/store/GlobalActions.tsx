import { ADD_FRIEND, ADD_USER } from "./GlobalActionsTypes";

export const addFriend = (friendsIndex: string) => ({
  type: ADD_FRIEND,
  payload: friendsIndex,
});

export const addUser = (user: any) => ({
  type: ADD_USER,
  payload: user,
});
