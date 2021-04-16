import React, { Component } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";

import GearsRatioTable from '../../components/GearsRatioTable/GearsRatoTable';
import styles from "./LandingScreen-style";

class LandingScreen extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      crank: ["22", "32", "44"],
      casete: ["11", "13", "15", "17", "20", "23", "26", "30", "34"],
    };
  }

  render() {
    const state = this.state;
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.menu}>
            <View style={styles.menuItem}></View>
            <View style={styles.menuItem}></View>
            <View style={styles.menuItem}></View>
          </View>
          <GearsRatioTable
            wheelSize={1.04}
            //@ts-ignore
            crank={state.crank}
            //@ts-ignore
            casete={state.casete}
          ></GearsRatioTable>
          <View style={styles.saveBtn}>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default LandingScreen;
