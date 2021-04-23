// @refresh state
import React from "react";
import { LogBox } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

import { Provider } from "react-redux";
import { createStore } from "redux";
import globalStore from "./app/store/GlobalReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTab from "./app/components/BottomTab/BottomTab";

const store = createStore(globalStore);

const firebaseConfig = {
  apiKey: "AIzaSyDk-p75QX33j-G0Kj_p-CoeX7hTNV-_96I",
  authDomain: "bikegears-282f0.firebaseapp.com",
  projectId: "bikegears-282f0",
  storageBucket: "bikegears-282f0.appspot.com",
  messagingSenderId: "1098564175858",
  appId: "1:1098564175858:web:29b091130ab07537880d6b",
  measurementId: "G-F7B983RST0",
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

//ignorovanie warningu na androide
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

AsyncStorage.getItem("selectedLanguage").then((data) => {
  const lang: { [key: string]: string } = { "0": "sk", "1": "en" };
  if (data == null) {
    AsyncStorage.setItem("selectedLanguage", "1");
    store.getState().global.selectedLanguage = 1;
    store.getState().global.appLang = lang["1"];
  } else {
    store.getState().global.selectedLanguage = +data;
    store.getState().global.appLang = lang[data];
  }
});
AsyncStorage.getItem("selectedHomeScreen").then((data) => {
  if (data == null) {
    AsyncStorage.setItem("selectedHomeScreen", "1");
    store.getState().global.selectedHomeScreen = 1;
  } else store.getState().global.selectedHomeScreen = +data;
});
AsyncStorage.getItem("selectedApirence").then((data) => {
  if (data == null) {
    AsyncStorage.setItem("selectedApirence", "0");
    store.getState().global.selectedApirence = 0;
  } else store.getState().global.selectedApirence = +data;
});

export default function App() {
  return (
    <Provider store={store}>
      <BottomTab></BottomTab>
    </Provider>
  );
}
