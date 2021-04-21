// @refresh state
import React from "react";
import LandingScreen from "./app/screens/LandingScreen/LandingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

import LoginScreen from "./app/screens/LoginScreen";
import SavedScreen from "./app/screens/SavedScreen";

import { Provider } from "react-redux";
import { createStore } from "redux";
import friendsReducer from "./app/store/GlobalReducer";

const store = createStore(friendsReducer);

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

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Login"
      component={LoginScreen}
      options={{
        tabBarLabel: "Settings",
        tabBarIcon: () => <AntDesign name="setting" size={24} color="black" />,
      }}
    />
    <Tab.Screen
      name="Home"
      component={LandingScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
      }}
    />
    <Tab.Screen
      name="Saved"
      component={SavedScreen}
      options={{
        tabBarLabel: "Saved",
        tabBarIcon: () => <AntDesign name="save" size={24} color="black" />,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}
