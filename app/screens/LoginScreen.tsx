import React, { Component } from "react";
import { SafeAreaView, Button } from "react-native";
import * as firebase from "firebase";
import LoginButton from "../components/LoginButton/LoginButton";

/**
 * oprazovka nastaveni
 */
class LoginScreen extends Component {
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
        {!this.state.isLogged && <LoginButton title="Sign in with google" />}
        {this.state.isLogged && (
          <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
        )}
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
