import React, { Component } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";

import { Image, Text } from "react-native-elements";
import GearsRatioTable from "../../components/GearsRatioTable/GearsRatoTable";
import style from "./LandingScreen-style";
import darkc from "../../colors";
import RNPickerSelect from "react-native-picker-select";
import Cassette from "../../data/casete";
import Crank from "../../data/crank";
import SaveModal from "../../components/SaveModal/SaveModal";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

/**
 * zakladna oprazovka, volenie atributov
 * pre vypocet gear ratia
 */
class LandingScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      crank: "",
      cassette: "",
      showTable: false,
      wheel: 1.04,
      cassetteSizes: [],
      crankSizes: [],
      isLogged: true,
    };
  }


  /**
   * subsribe na auth state
   */
  componentDidMount() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isLogged: user != null });
    });
  }

  componentWillUnmount() {
    this.firebaseUnsubscribe();
  }

  firebaseUnsubscribe: firebase.Unsubscribe = () => {};

  /**
   * offilne data pre kazetu a crank
   */
  cassette = Cassette;
  crank = Crank;

  /**
   * funkcia riadi:
   * - ci sa ma zobrazovat tabulka na landingu
   * - ktory set zubov na kazete sa ma zobrazit
   * @param actual
   */
  showData = (actual: ActualSetup) => {
    if (actual.wheelSize != "0") {
      this.state = {
        wheel: actual.wheelSize,
      };
    }
    if (actual.crankSize != "0") {
      let cassetteTable: { label: string; value: string }[] = [];
      const test = +actual.crankSize - 1;
      this.crank[test].forEach((cog) => {
        cassetteTable.push({ label: cog.td, value: cog.td });
      });
      this.setState({ crankSizes: cassetteTable });
    } else {
      this.setState({ crankSizes: [], crank: "0" });
    }
    if (actual.cassetteSize != "0") {
      let cassetteTable: { label: string; value: string }[] = [];
      this.cassette[+actual.cassetteSize - 1].forEach((cog) => {
        cassetteTable.push({ label: cog.td, value: cog.td });
      });
      this.setState({ cassetteSizes: cassetteTable });
    } else {
      this.setState({ cassetteSizes: [], cassette: "0" });
    }
    if (actual.cassette != "0") {
      this.setState({ cassette: actual.cassette });
    }
    if (actual.crank != "0") {
      this.setState({ crank: actual.crank });
    }
    if (
      actual.wheelSize != "0" &&
      actual.crankSize != "0" &&
      actual.cassetteSize != "0" &&
      actual.crank != "0" &&
      actual.cassette != "0"
    ) {
      this.setState({ showTable: true });
    } else {
      this.setState({ showTable: false });
    }
  };

  /**
   * aktualne navolene data
   */
  actual: ActualSetup = {
    wheelSize: "0",
    crankSize: "0",
    cassetteSize: "0",
    crank: "0",
    cassette: "0",
  };


  /**
   * 
   * @param casete 
   * @returns skratenu verziu label pre kazetu
   */
  caseteLabel = (casete: string): string => {
    if(casete == "0") return "";

    const caseteArray = casete.split("-");
    if (caseteArray.length <= 2) {
      return casete;
    }
    return caseteArray[0] + ".." + caseteArray[caseteArray.length - 1];
  };

  render() {
    const state = this.state;
    let showTable = state.showTable;
    const actual = this.actual;
    const styleId = +this.props.global.selectedApirence;
    const styles = style[styleId];
    return (
      <SafeAreaView>
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.menu}>
            {/** vyber velkosti kolesa */}
            <View style={styles.menuItem}>
              <Image
                source={require("../../assets/icons/wheel.png")}
                style={styles.image}
              />
              <View>
                <RNPickerSelect
                  onValueChange={(value: string) => {
                    actual.wheelSize = value;
                    this.showData(actual);
                  }}
                  items={wheelSize}
                >
                  <View style={styles.addView}>
                    <Text style={styles.label}>
                      {actual.wheelSize != "0" ? actual.wheelSize : ""}
                    </Text>
                    <AntDesign name="plussquareo" size={44} color={styleId ? darkc.light:"black"} />
                  </View>
                </RNPickerSelect>
              </View>
            </View>
            {/** vyber velkosti stredu */}
            <View style={styles.menuItem}>
              <Image
                source={require("../../assets/icons/crankset.png")}
                style={styles.image}
              />
              <View>
                <RNPickerSelect
                  onValueChange={(value: string) => {
                    actual.crankSize = value;
                    this.showData(actual);
                  }}
                  placeholder={label("Select crank size")}
                  items={crankSize}
                >
                  <View style={styles.addView}>
                    <Text style={styles.label}>
                      {actual.crankSize != "0" ? actual.crankSize : ""}
                    </Text>
                    <AntDesign name="plussquareo" size={44} color={styleId ? darkc.light:"black"} />
                  </View>
                </RNPickerSelect>
              </View>
              <View>
                <RNPickerSelect
                  onValueChange={(value: string) => {
                    actual.crank = value;
                    this.showData(actual);
                  }}
                  value={state.crank}
                  placeholder={label("Select crank type")}
                  items={state.crankSizes}
                >
                  <View style={styles.addView}>
                    <Text style={styles.label}>
                      {actual.crank != "0" ? actual.crank : ""}
                    </Text>
                    <AntDesign name="plussquareo" size={44} color={styleId ? darkc.light:"black"} />
                  </View>
                </RNPickerSelect>
              </View>
            </View>
            {/** vyber velkosti kazety */}
            <View style={styles.menuItem}>
              <Image
                source={require("../../assets/icons/cassette.png")}
                style={styles.image}
              />
              <View>
                <RNPickerSelect
                  onValueChange={(value: string) => {
                    actual.cassetteSize = value;
                    this.showData(actual);
                  }}
                  placeholder={label("Select cassette size")}
                  items={cassetteSize}
                >
                  <View style={styles.addView}>
                    <Text style={styles.label}>
                      {actual.cassetteSize != "0" ? actual.cassetteSize : ""}
                    </Text>
                    <AntDesign name="plussquareo" size={44} color={styleId ? darkc.light:"black"} />
                  </View>
                </RNPickerSelect>
              </View>

              <View>
                <RNPickerSelect
                  onValueChange={(value: string) => {
                    actual.cassette = value;
                    this.showData(actual);
                  }}
                  value={state.cassette}
                  placeholder={label("Select cassette type")}
                  items={state.cassetteSizes}
                >
                  <View style={styles.addView}>
                    <Text style={styles.label}>
                      {this.caseteLabel(actual.cassette)}
                    </Text>
                    <AntDesign name="plussquareo" size={44} color={styleId ? darkc.light:"black"} />
                  </View>
                </RNPickerSelect>
              </View>
            </View>
          </View>
          {showTable && (
            <GearsRatioTable
              wheelSize={1.04}
              crank={state.crank}
              cassette={state.cassette}
            ></GearsRatioTable>
          )}
          <SaveModal setup={actual} isLogged={state.isLogged} showButton={showTable}></SaveModal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: { global: any }) => {
  const { global } = state;
  return { global };
};

export default connect(mapStateToProps)(LandingScreen);

const wheelSize = [
  { label: "26", value: "26" },
  { label: "27.5", value: "27.5" },
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

let cassetteSize: Array<PickerItem> = [];
for (let i = 1; i <= 13; i++) {
  cassetteSize.push({ label: i + "", value: i + "" });
}

/**
 * picker item label
 */
const label = (name: string): PickerItem => {
  return { label: name, color: "#9EA0A4", value: "0" };
};
