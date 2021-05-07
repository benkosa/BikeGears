import React, { Component } from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { Button, Text } from "react-native-elements";

import firebase from "firebase";
import LoginButton from "../../components/LoginButton/LoginButton";
import { FontAwesome } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
import GearsRatioTable from "../../components/GearsRatioTable/GearsRatoTable";
import { connect } from "react-redux";

import styles from "./SavedScreen-style";
import language from "./SavedScreen-lang";

/**
 * oprazovka ulozenych
 */
class SavedScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogged: true,
      dbSetup: [],
    };
  }

  /**
   * subscribe na uzivatelove ulozene prevody
   * v databaze
   */
  getSetup = () => {
    const token = firebase.auth().currentUser?.uid;
    if (token) {
      this.firestoreUnsubscribe = firebase
        .firestore()
        .collection("setup_" + token)
        .onSnapshot((querySnapshot) => {
          this.setState({
            dbSetup: querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
              icon: "gears",
              showTable: false,
            })),
          });
        });
    }
  };

  /**
   * zmaze dany prevod z databazy
   */
  removeSetup = (setupId: string) => {
    const token = firebase.auth().currentUser?.uid;
    if (token) {
      firebase
        .firestore()
        .collection("setup_" + token)
        .doc(setupId)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  };

  /**
   * subscurbe na auth state
   * ziskanie dat
   */
  componentDidMount() {
    //subscribe na firebase auth
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isLogged: user != null, dbSetup: [] });
      //pri zmene auth state sa spravi novy subscribe na db
      this.firestoreUnsubscribe();
      this.getSetup();
    });
  }

  componentWillUnmount() {
    this.firebaseUnsubscribe();
    this.firestoreUnsubscribe();
  }

  firebaseUnsubscribe: firebase.Unsubscribe = () => {};
  firestoreUnsubscribe: firebase.Unsubscribe = () => {};

  render() {
    const styleId = +this.props.global.selectedApirence;
    const style = styles[styleId];
    const lang = language[this.props.global.appLang];

    return (
      <SafeAreaView>
        {styleId == 0 && <StatusBar barStyle="dark-content" />}
        {styleId != 0 && <StatusBar barStyle="light-content" />}
        <ScrollView style={{ height: "100%" }}>
          {!this.state.isLogged && (
            <>
              <Text style={[style.text, style.notice]}>{lang.NOTICE}</Text>
              <LoginButton title={lang.SIGN_IN}></LoginButton>
            </>
          )}
          {this.state.isLogged &&
            this.state.dbSetup.map((item: any) => (
              <View key={item.id}>
                <ListItem
                  containerStyle={style.background}
                  bottomDivider
                  onPress={() => {
                    item.showTable = !item.showTable;
                    this.forceUpdate();
                  }}
                >
                  <FontAwesome
                    name={item.icon}
                    size={24}
                    color={styleId ? "white" : "black"}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={style.text}>
                      {item.title}
                    </ListItem.Title>
                    <ListItem.Subtitle style={style.text}>
                      {item.setup.crankSize + "x" + item.setup.cassetteSize}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                {item.showTable && (
                  <View>
                    <GearsRatioTable
                      wheelSize={1}
                      crank={item.setup.crank}
                      cassette={item.setup.cassette}
                    ></GearsRatioTable>
                    <Button
                      style={style.deleteButton}
                      buttonStyle={style.deleteButton}
                      title={lang.DELETE_BTN}
                      onPress={() => this.removeSetup(item.id)}
                    ></Button>
                  </View>
                )}
              </View>
            ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: { global: any }) => {
  const { global } = state;
  return { global };
};

export default connect(mapStateToProps)(SavedScreen);
