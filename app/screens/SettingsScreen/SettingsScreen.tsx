import React, { Component } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import * as firebase from "firebase";
import LoginButton from "../../components/LoginButton/LoginButton";

import language from "./SettingsScreen-lang";

import { connect } from "react-redux";
import {
  ButtonGroup,
  Button,
  ListItem,
  Text,
  Avatar,
} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import {
  setApirence,
  setHomeScreen,
  setLanguage,
} from "../../store/GlobalActions";
import Style from "./SettingsScreen-style";

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
      name: "",
      email: "",
      picture:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    };
    //this.getProfile();
  }

  /**
   * ulozi jazyk do asyncStorage a do store
   * @param selectedLanguage
   */
  updateLanguage(selectedLanguage: number) {
    this.setState({ selectedLanguage });
    AsyncStorage.setItem("selectedLanguage", selectedLanguage + "");
    this.props.setLanguage(selectedLanguage);
  }

  /**
   * ulozi vzhlad do asyncStorage a do store
   * @param selectedLanguage
   */
  updateApirence(selectedApirence: number) {
    this.setState({ selectedApirence });
    AsyncStorage.setItem("selectedApirence", selectedApirence + "");
    this.props.setApirence(selectedApirence);
  }

  /**
   * ziska informacie o prihlaenom uzivatelovi
   */
  getProfile = () => {
    const token = firebase.auth().currentUser?.uid;
    if (token) {
      firebase
        .firestore()
        .collection("profile")
        .doc(token)
        .get()
        .then((doc) => {
          this.setState({
            name: doc.data()?.name,
            email: doc.data()?.emal,
            picture: doc.data()?.picture,
          });
        });
    }
  };

  /**
   * subscribe na state + ziskanie dat o uzivatelovi
   */
  componentDidMount() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isLogged: user != null });
      this.getProfile();
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
        {a == 0 && <StatusBar barStyle="dark-content" />}
        {a != 0 && <StatusBar barStyle="light-content" />}
        {!state.isLogged && <LoginButton title={language[lang].SIGN_IN} />}

        {state.isLogged && (
          <View style={Style[a].profileContainer}>
            <Avatar
              size="large"
              rounded
              source={{
                uri: state.picture,
              }}
              containerStyle={Style[a].centerAvatar}
            />
            <Text h3 style={[Style[a].text, Style[a].centerText]}>
              {state.name}
            </Text>
            <Text h4 style={[Style[a].text, Style[a].centerText]}>
              {state.email}
            </Text>
          </View>
        )}

        <ListItem bottomDivider containerStyle={Style[a].background}>
          <ListItem.Content>
            <ListItem.Title style={Style[a].text}>
              {language[lang].LANG_BTN_TITLE}
            </ListItem.Title>
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
              {language[lang].APIRENCE_BTN_TITLE}
            </ListItem.Title>
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
          <View style={Style[a].signOutContainer}>
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
