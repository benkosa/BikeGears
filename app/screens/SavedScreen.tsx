import React, { Component } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

import firebase from "firebase";
import LoginButton from "../components/LoginButton/LoginButton";

/**
 * oprazovka ulozenych
 */
class SavedScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogged: true,
    };
  }

  /**
   * vola sa pri vytvoreni componentu
   */
  componentDidMount() {
    this.checkIsLogged();
  }

  /**
   * vola sa pri zahadzovani komponentu
   */
  componentWillUnmount() {
    this.firebaseUnsubscribe();
  }

  /**
   * pointer na firebase auth
   * aby sa dal zmazat
   */
  firebaseUnsubscribe: firebase.Unsubscribe = () => {};

  /**
   * kontrola ci je uzivatel prihlaseny
   */
  checkIsLogged = () => {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLogged: true });
        console.log("prihlaseny");
      } else {
        this.setState({ isLogged: false });
        console.log("neprihlaseny");
      }
    });
  };

  render() {
    return (
      <SafeAreaView>
        {!this.state.isLogged &&
          <LoginButton title="Sign in with google"></LoginButton>
        }
        {this.state.isLogged &&
          <></>
        }
      </SafeAreaView>
    );
  }
}

export default SavedScreen;
