import React, { Component } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import * as firebase from "firebase";
import LoginButton from "../../components/LoginButton/LoginButton";

import language from "./SettingsScreen-lang";

import { connect } from "react-redux";
import { ButtonGroup, Button, ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import {
  setApirence,
  setHomeScreen,
  setLanguage,
} from "../../store/GlobalActions";
import Style from "./SettingsScreen-style"

/**
 * oprazovka nastaveni
 */
class SettingsScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogged: true,
      selectedLanguage: 0,
      selectedHomeScreen: 1,
      selectedApirence: 0,
    };
    //this.getProfile();
  }

  updateLanguage(selectedLanguage: number) {
    this.setState({ selectedLanguage });
    AsyncStorage.setItem("selectedLanguage", selectedLanguage + "");
    this.props.setLanguage(selectedLanguage);
  }

  updateHomeScreen(selectedHomeScreen: number) {
    this.setState({ selectedHomeScreen });
    AsyncStorage.setItem("selectedHomeScreen", selectedHomeScreen + "");
    this.props.setHomeScreen(selectedHomeScreen);
    this.forceUpdate();
  }

  updateApirence(selectedApirence: number) {
    this.setState({ selectedApirence });
    AsyncStorage.setItem("selectedApirence", selectedApirence + "");
    this.props.setApirence(selectedApirence);
  }

  getProfile = () => {
    console.log("bol som tu");
    const token = firebase.auth().currentUser?.uid;
    console.log(token);
    if (token) {
      firebase
        .firestore()
        .collection("profile")
        .doc(token)
        .get()
        .then((doc) => {
          console.log(doc.data());
        });
    }
  };

  componentDidMount() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isLogged: user != null });
    });
  }

  componentWillUnmount() {
    this.firebaseUnsubscribe();
  }

  firebaseUnsubscribe: firebase.Unsubscribe = () => {};

  render() {
    const globalStore = this.props.global;
    const state = this.state;
    const lang: string = globalStore.appLang;
    const a: number = globalStore.selectedApirence;

    return (
      <SafeAreaView style={Style[a].container}>
      {a == 0 && <StatusBar  barStyle="dark-content" translucent={true} />}
      {a != 0 && <StatusBar  barStyle="light-content" translucent={true} />}
        {!state.isLogged && <LoginButton title={language[lang].SIGN_IN} />}

        <ListItem bottomDivider containerStyle={Style[a].background}>
          <ListItem.Content>
            <ListItem.Title style={Style[a].text}>{language[lang].LANG_BTN_TITLE}</ListItem.Title>
            <ButtonGroup
              onPress={(value) => this.updateLanguage(value)}
              selectedIndex={globalStore.selectedLanguage}
              buttons={language[lang].LANG_BTN}
              buttonStyle={Style[a].buttonPasive}
              selectedButtonStyle={Style[a].button}
              containerStyle={Style[a].border}
              innerBorderStyle={Style[a].innerBorder}
            />
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider containerStyle={Style[a].background}>
          <ListItem.Content>
            <ListItem.Title style={Style[a].text}>
              {language[lang].HOMESCREEN_BTN_TITLE}
            </ListItem.Title>
            <ButtonGroup
              onPress={(value) => this.updateHomeScreen(value)}
              selectedIndex={globalStore.selectedHomeScreen}
              buttons={language[lang].HOMESCREEN_BTN}
              buttonStyle={Style[a].buttonPasive}
              selectedButtonStyle={Style[a].button}
              containerStyle={Style[a].border}
              innerBorderStyle={Style[a].innerBorder}
            />
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider containerStyle={Style[a].background}>
          <ListItem.Content>
            <ListItem.Title style={Style[a].text}>{language[lang].APIRENCE_BTN_TITLE}</ListItem.Title>
            <ButtonGroup
              onPress={(value) => this.updateApirence(value)}
              selectedIndex={globalStore.selectedApirence}
              buttons={language[lang].APIRENCE_BTN}
              buttonStyle={Style[a].buttonPasive}
              selectedButtonStyle={Style[a].button}
              containerStyle={Style[a].border}
              innerBorderStyle={Style[a].innerBorder}
            />
          </ListItem.Content>
        </ListItem>

        {state.isLogged && (
          <View
            style={Style[a].signOutContainer}
          >
            <Button
              title={language[lang].SIGN_OUT}
              onPress={() => firebase.auth().signOut()}
              buttonStyle={Style[a].buttonPasive}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: { global: any }) => {
  const { global } = state;
  return { global };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setApirence,
      setHomeScreen,
      setLanguage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
