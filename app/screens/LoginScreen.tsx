import React, { Component } from "react";
import { SafeAreaView, Button } from "react-native";
import * as firebase from "firebase";
import LoginButton from "../components/LoginButton/LoginButton";

import { connect } from 'react-redux';

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
    console.log(this.props.global.user);
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

const mapStateToProps = (state: { global: any; }) => {
  const { global } = state
  return { global }
};

export default connect(mapStateToProps)(LoginScreen);

//export default LoginScreen;
