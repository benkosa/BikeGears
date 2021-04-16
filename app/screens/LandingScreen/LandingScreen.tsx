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
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

class LandingScreen extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      crank: ["22", "32", "44"],
      casete: ["11", "13", "15", "17", "20", "23", "26", "30", "34"],
    };
  }

  placeholder = {
    label: "Select a sport...",
    value: null,
    color: "#9EA0A4",
  };

  InputAccessoryView() {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState(
              {
                //favSport5: this.state.previousFavSport5,
              },
              () => {
                //this.inputRefs.favSport5.togglePicker(true);
              }
            );
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <View testID="needed_for_touchable">
            <Text style={[{ fontWeight: "normal", color: "red" }]}>Cancel</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text>Name | Prefer</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            //this.inputRefs.favSport5.togglePicker(true);
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <View testID="needed_for_touchable">
            <Text>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    const state = this.state;
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.menu}>
            <View style={styles.menuItem}>
              <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={{ label: "Select wheel size", color: "#9EA0A4" }}
                items={wheelSize}
              />
            </View>
            <View style={styles.menuItem}>
              <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={{ label: "Select crank size", color: "#9EA0A4" }}
                items={crankSize}
              />
              <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={{ label: "Select crank type", color: "#9EA0A4" }}
                items={[
                  { label: "26", value: "26" },
                  { label: "27.5", value: "27" },
                  { label: "29", value: "29" },
                ]}
              />
            </View>
            <View style={styles.menuItem}>
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={{ label: "Select casete size", color: "#9EA0A4" }}
                items={caseteSize}
              />
              <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={{ label: "Select casete type", color: "#9EA0A4" }}
                items={[
                  { label: "26", value: "26" },
                  { label: "27.5", value: "27" },
                  { label: "29", value: "29" },
                ]}
              />
            </View>
          </View>
          <GearsRatioTable
            wheelSize={1.04}
            //@ts-ignore
            crank={state.crank}
            //@ts-ignore
            casete={state.casete}
          ></GearsRatioTable>
          <View style={styles.saveBtn}>
            <Button title="Save" onPress={()=>console.log("save")}></Button>
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

let caseteSize:any = [];
for (let i = 1; i <= 13; i++) {
  caseteSize.push({ label: i+"", value: i+"" })
}

interface PickerItem {
  label: string, value: string
}
