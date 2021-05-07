import React, { Component } from "react";
import { Button } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";

import { addUser } from "../../store/GlobalActions";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

class LoginButton extends Component<LoginButtonProps> {
  constructor(props: LoginButtonProps) {
    super(props);
    this.state = {};
  }

  /**
   * skopirovane z dokumentacie
   * https://firebase.google.com/docs/auth/web/google-signin#expandable-2
   * @param googleUser 
   * @param firebaseUser 
   * @returns 
   */
  isUserEqual = (googleUser: any, firebaseUser: any) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };


  /**
   * skopirovane z dokumentacie
   * https://firebase.google.com/docs/auth/web/google-signin#expandable-2
   * @param googleUser 
   */
  onSignIn = (googleUser: any) => {
    //console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          //googleUser.getAuthResponse().id_token
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            //console.log("user signed in");
            if (result.additionalUserInfo?.isNewUser) {
              //zapiseme si noveho usera do firebase database
            }
            this.handleSendNewUserData(result.additionalUserInfo?.profile);
            this.props.addUser(result.additionalUserInfo?.profile);
            try {
              if (this.props.onPress) this.props.onPress();
            } catch (e) {}
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        //console.log("User already signed-in Firebase.");
      }
    });
  };


  /**
   * skopirovane z dokumentacie
   * https://firebase.google.com/docs/auth/web/google-signin#expandable-2
   * @returns 
   */
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "1098564175858-i1kghu3kauvg3l23hgd2b1n2cfe2ff48.apps.googleusercontent.com",
        //behavior: 'web',
        iosClientId:
          "1098564175858-pt3i4vmamavcqvlh6hnd6aid36cij00t.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };


  /**
   * ulozsi data uzivatela ktory sa prihlasuje prvy krat
   * @param data 
   */
  handleSendNewUserData = async (data: any) => {
    const token = firebase.auth().currentUser?.uid;
    if (token) {
      firebase.firestore().collection("profile").doc(token).set({
        name: data.name,
        emal: data.email,
        picture: data.picture,
        locale: data.locale,
      });
    }
  };

  render() {
    return (
      <>
        <Button
          title={this.props.title}
          onPress={() => this.signInWithGoogleAsync()}
          disabled={this.props.disabled}
          icon={<AntDesign name="google" size={24} color="black" />}
        />
      </>
    );
  }
}

//export default LoginButton;

const mapStateToProps = (state: LoginButtonProps) => {
  const global = state;
  return global;
};

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  ownProps: LoginButtonProps
) =>
  bindActionCreators(
    {
      addUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
