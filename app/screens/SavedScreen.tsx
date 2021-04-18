import React, { Component } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

import firebase from "firebase";

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
   * vola sa pri zahadzivani komponentu
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
        <Text numberOfLines={2}>
          {this.state.isLogged ? "prihlaseny" : "neprihlaseny"}
        </Text>
      </SafeAreaView>
    );
  }
}

export default SavedScreen;
