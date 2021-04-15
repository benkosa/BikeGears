import React, { Component } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

class LandingScreen extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      tableHead: ["", "22", "32", "44"],
      tableTitle: ["11", "13", "15", "17", "20", "23", "26", "30", "34"],
      tableData: this.calculateGearsRatio(
        1.04,
        ["22", "32", "44"],
        ["11", "13", "15", "17", "20", "23", "26", "30", "34"]
      ),
      table2Title: ["Min", "max"],
      table2Data: [["0.67"],["4.15"]]

    };
  }

  calculateGearsRatio = (
    wheelSize: number,
    crank: Array<string>,
    casete: Array<string>
  ): number[][] => {
    let gearRatio = [];
    for (let i = 0; i < casete.length; i++) {
      gearRatio[i] = new Array(crank.length).fill(0);
      for (let j = 0; j < crank.length; j++)
        gearRatio[i][j] =
          Math.round(wheelSize * (+crank[j] / +casete[i]) * 100) / 100;
    }

    return gearRatio;
  };

  public rest = this.state;

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
          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1 }}>
              <Row
                //@ts-ignore
                data={state.tableHead}
                flexArr={[1, 2, 1, 1]}
                style={styles.head}
                textStyle={styles.textBold}
              />
              <TableWrapper style={styles.wrapper}>
                <Col
                  //@ts-ignore
                  data={state.tableTitle}
                  style={styles.title}
                  heightArr={[28, 28]}
                  textStyle={styles.textBold}
                />
                <Rows
                  //@ts-ignore
                  data={state.tableData}
                  flexArr={[2, 1, 1]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
          </View>
          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1 }}>
              <TableWrapper style={styles.wrapper}>
                <Col
                  //@ts-ignore
                  data={state.table2Title}
                  style={styles.title}
                  textStyle={styles.textBold}
                  heightArr={[28, 28]}
                />
                <Rows
                  //@ts-ignore
                  data={state.table2Data}
                  flexArr={[2, 1, 1]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
          </View>
          <View style={styles.saveBtn}>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30},
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  text: { textAlign: 'center' },
  textBold: { textAlign: 'center', fontWeight: 'bold' },
  row: { height: 28 },

  menu: {
    height: 150,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  menuItem: {
    height: 150,
    width: 100,
    backgroundColor: "gold",
  },
  saveBtn: {
    height: 50,
    backgroundColor: "tomato"
  }
});

export default LandingScreen;
