import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
  Text,
} from "react-native";

import GearsRatioTable from "../../components/GearsRatioTable/GearsRatoTable";
import styles from "./LandingScreen-style";
import RNPickerSelect from "react-native-picker-select";
import Casete from "../../data/casete";
import Crank from "../../data/crank";

class LandingScreen extends Component {
  
  constructor(props: any) {
    
    super(props);
    let caseteTable: { label: string; value: string }[] = [];
    this.casete[0].forEach((cog) => {
      caseteTable.push({ label: cog.td, value: cog.td });
    });

    this.state = {
      crank: "",
      casete: "",
      caseteTable: [],
      showTable: false,
      wheel: false,
      cassetteSizes: [],
      crankSizes: [],
    };
  }

  casete = Casete;
  crank = Crank;

  placeholder = {
    label: "Select a sport...",
    value: null,
    color: "#9EA0A4",
  };

  showData = (actual: ActualSetup) => {
    console.log(actual);
    let showTable = true;
    if (actual.wheelSize != "0") {
      this.state = {
        wheel: actual.wheelSize
      }
    }
    
    if (actual.crankSize != "0") {
      let caseteTable: { label: string; value: string }[] = [];
      const test = +actual.crankSize-1;
      this.crank[test].forEach((cog) => {
        caseteTable.push({ label: cog.td, value: cog.td });
      });
      this.setState({ crankSizes: caseteTable });
    } else {
      this.setState({ crankSizes: [], crank: "0" });
    }
    
    if (actual.cassetteSize != "0") {
      let caseteTable: { label: string; value: string }[] = [];
      this.casete[+actual.cassetteSize-1].forEach((cog) => {
        caseteTable.push({ label: cog.td, value: cog.td });
      });
      this.setState({ cassetteSizes: caseteTable });
    }else {
      this.setState({ cassetteSizes: [], casete: "0" });
    }

    if(actual.cassette != "0") {
      this.setState({ casete: actual.cassette });
    } 

    if(actual.crank != "0") {
      this.setState({ crank: actual.crank });
    }

    if(
      actual.wheelSize != "0" &&
      actual.crankSize != "0" &&
      actual.cassetteSize != "0" &&
      actual.crank != "0" &&
      actual.cassette != "0") {
        this.setState({ showTable: true });
    } else {
      this.setState({ showTable: false });
    }

  };
  actual = {
    wheelSize: "0",
    crankSize: "0",
    cassetteSize: "0",
    crank: "0",
    cassette: "0",
  };
  render() {
    const state = this.state;
    /*@ts-ignore*/
    let test = this.state.showTable;
    const actual = this.actual;
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.menu}>
            <View style={styles.menuItem}>
              <RNPickerSelect
                onValueChange={(value) => {
                  actual.wheelSize = value;
                  this.showData(actual);
                }}
                placeholder={label("Select wheel size")}
                items={wheelSize}
              />
            </View>
            <View style={styles.menuItem}>
              <RNPickerSelect
                onValueChange={(value) => {
                  actual.crankSize = value;
                  this.showData(actual);
                }}
                placeholder={label("Select crank size")}
                items={crankSize}
              />
              <RNPickerSelect
                onValueChange={(value) => {
                  actual.crank = value;
                  this.showData(actual);
                }}
                /*@ts-ignore*/
                value={(state.crank)}
                placeholder={label("Select crank type")}
                /*@ts-ignore*/
                items={state.crankSizes}
              />
            </View>
            <View style={styles.menuItem}>
              <RNPickerSelect
                onValueChange={(value) => {
                  actual.cassetteSize = value;
                  this.showData(actual);
                }}
                placeholder={label("Select cassette size")}
                /*@ts-ignore*/
                items={caseteSize}
              />
              <RNPickerSelect
                onValueChange={(value) => {
                  actual.cassette = value;
                  this.showData(actual);
                }}
                /*@ts-ignore*/
                value={(state.casete)}
                placeholder={label("Select cassette type")}
                /*@ts-ignore*/
                items={state.cassetteSizes}
              />
            </View>
          </View>
          {test && (
            <GearsRatioTable
              wheelSize={1.04}
              //@ts-ignore
              crank={state.crank}
              //@ts-ignore
              casete={state.casete}
            ></GearsRatioTable>
          )}
          <View style={styles.saveBtn}>
            <Button title="Save" onPress={() => console.log("save")}></Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default LandingScreen;

const wheelSize = [
  { label: "26", value: "26" },
  { label: "27.5", value: "27" },
  { label: "29", value: "29" },
  { label: "28", value: "28" },
  { label: "20", value: "20" },
  { label: "24", value: "24" },
];

const crankSize = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];

let caseteSize: any = [];
for (let i = 1; i <= 13; i++) {
  caseteSize.push({ label: i + "", value: i + "" });
}

interface PickerItem {
  label: string;
  value: string;
  color: string;
}

interface ActualSetup {
  wheelSize: string;
  crankSize: string;
  cassetteSize: string;
  crank: string;
  cassette: string;
}

const label = (name: string): PickerItem => {
  return { label: name, color: "#9EA0A4", value: "0" };
};
