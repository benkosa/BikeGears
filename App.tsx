import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Button } from "react-native";
import LandingScreen from "./app/screens/LandingScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./app/screens/LoginScreen";
import SavedScreen from "./app/screens/SavedScreen";
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Login" component={LoginScreen}/>
    <Tab.Screen name="Home" component={LandingScreen}/>
    <Tab.Screen name="Saved" component={SavedScreen}/>
  </Tab.Navigator>
)

export default function App() {
  return (
    <NavigationContainer >
      <TabNavigator/>
    </NavigationContainer>
  );
}
