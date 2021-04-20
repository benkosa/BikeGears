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
