import React, { Component } from "react";
import { SafeAreaView, Button } from "react-native";
import * as firebase from "firebase";
import LoginButton from "../components/LoginButton/LoginButton";

/**
 * oprazovka nastaveni
 */
class LoginScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <LoginButton title="Sign in with google"/>
        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
