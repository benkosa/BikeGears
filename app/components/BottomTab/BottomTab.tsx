import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingScreen from "../../../app/screens/LandingScreen/LandingScreen";
import "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

import SettingsScreen from "../../../app/screens/SettingsScreen/SettingsScreen";
import SavedScreen from "../../../app/screens/SavedScreen";

import { connect } from "react-redux";

import style from "./BottomTab-style";
import lang from "./BottomTab-lang";

const Tab = createBottomTabNavigator();
class BottomTab extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const a = this.props.global.selectedApirence;
    const appLang = this.props.global.appLang;
    return (
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={style[a].container}
          initialRouteName="Home"
          tabBarOptions={{
            showLabel: true,
            style: style[a].background,
          }}
        >
          <Tab.Screen
            name="Login"
            component={SettingsScreen}
            options={{
              tabBarBadgeStyle: { color: "red" },
              tabBarLabel: lang[appLang].SETTINGS,
              tabBarIcon: () => (
                <AntDesign name="setting" size={24} {...style[a].icon} />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={LandingScreen}
            options={{
              tabBarLabel: lang[appLang].HOME,
              tabBarIcon: () => (
                <AntDesign name="home" size={24} {...style[a].icon} />
              ),
            }}
          />
          <Tab.Screen
            name="Saved"
            component={SavedScreen}
            options={{
              tabBarLabel: lang[appLang].SAVE,
              tabBarIcon: () => (
                <AntDesign name="save" size={24} {...style[a].icon} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: { global: any }) => {
  const { global } = state;
  return { global };
};

export default connect(mapStateToProps)(BottomTab);
