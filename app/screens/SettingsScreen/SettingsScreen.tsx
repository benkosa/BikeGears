import React, { Component } from "react";
import { SafeAreaView, Button } from "react-native";
import * as firebase from "firebase";
import LoginButton from "../../components/LoginButton/LoginButton";

import { connect } from 'react-redux';

/**
 * oprazovka nastaveni
 */
class SettingsScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogged: true,
    };
    this.getProfile();
  }

  getProfile = () => {
    console.log("bol som tu")
    const token = firebase.auth().currentUser?.uid;
    console.log(token)
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

export default connect(mapStateToProps)(SettingsScreen);
