import React, { Component } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from 'react-native-elements';

import firebase from "firebase";
import LoginButton from "../components/LoginButton/LoginButton";
import { FontAwesome } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
import GearsRatioTable from "../components/GearsRatioTable/GearsRatoTable";

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
    return (
      <SafeAreaView>
        <ScrollView style={{ height: "100%" }}>
          {!this.state.isLogged && (
            <>
              <Text h4>You must log in before saving</Text>
              <LoginButton title="Sign in with google"></LoginButton>
            </>
          )}
          {this.state.isLogged &&
            this.state.dbSetup.map((item: any) => (
              <View key={item.id}>
                <ListItem
                  bottomDivider
                  onPress={() => {
                    console.log("test");
                    item.showTable = !item.showTable;
                    this.forceUpdate();
                  }}
                >
                  <FontAwesome name={item.icon} size={24} />
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                    <ListItem.Subtitle>
                      {item.setup.crankSize + "x" + item.setup.cassetteSize}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                {item.showTable && (
                  <GearsRatioTable
                    wheelSize={1.04}
                    crank={item.setup.crank}
                    cassette={item.setup.cassette}
                  ></GearsRatioTable>
                )}
              </View>
            ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SavedScreen;
