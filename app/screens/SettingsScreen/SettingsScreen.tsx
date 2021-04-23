import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import * as firebase from "firebase";
import LoginButton from "../../components/LoginButton/LoginButton";

import language from "./SettingsScreen-lang";

import { connect } from "react-redux";
import { ButtonGroup, Button, Text, ListItem } from "react-native-elements";

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
    this.getProfile();
  }

  updateLanguage(selectedLanguage: number) {
    this.setState({ selectedLanguage });
  }

  updateHomeScreen(selectedHomeScreen: number) {
    this.setState({ selectedHomeScreen });
  }

  updateApirence(selectedApirence: number) {
    this.setState({ selectedApirence });
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
    return (
      <SafeAreaView>
        {!this.state.isLogged && <LoginButton title={language["sk"].SIGN_IN} />}

        <ListItem bottomDivider topDivider>
          <ListItem.Content>
            <ListItem.Title>{language["sk"].LANG_BTN_TITLE}</ListItem.Title>
            <ButtonGroup
              onPress={(value) => this.updateLanguage(value)}
              selectedIndex={this.state.selectedLanguage}
              buttons={language["sk"].LANG_BTN}
              containerStyle={{}}
            />
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              {language["sk"].HOMESCREEN_BTN_TITLE}
            </ListItem.Title>
            <ButtonGroup
              onPress={(value) => this.updateHomeScreen(value)}
              selectedIndex={this.state.selectedHomeScreen}
              buttons={language["sk"].HOMESCREEN_BTN}
              containerStyle={{}}
            />
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{language["sk"].APIRENCE_BTN_TITLE}</ListItem.Title>
            <ButtonGroup
              onPress={(value) => this.updateApirence(value)}
              selectedIndex={this.state.selectedApirence}
              buttons={language["sk"].APIRENCE_BTN}
              containerStyle={{}}
            />
          </ListItem.Content>
        </ListItem>

        {this.state.isLogged && (
          <Button
            title={language["sk"].SIGN_OUT}
            onPress={() => firebase.auth().signOut()}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: { global: any }) => {
  const { global } = state;
  return { global };
};

export default connect(mapStateToProps)(SettingsScreen);
