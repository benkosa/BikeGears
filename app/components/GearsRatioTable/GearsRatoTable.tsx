import React from "react";
import { View } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";

import styles from "./GearsRatioTable-style";

function GearsRatioTable(props: GearsRatioTableProps) {
  const calculateGearsRatio = (
    wheelSize: number,
    crankS: string,
    caseteS: string
  ): number[][] => {
    let gearRatio = [];
    const crank = crankS.split("-");
    const casete = caseteS.split("-");
    for (let i = 0; i < casete.length; i++) {
      gearRatio[i] = new Array(crank.length).fill(0);
      for (let j = 0; j < crank.length; j++)
        gearRatio[i][j] =
          Math.round(wheelSize * (+crank[j] / +casete[i]) * 100) / 100;
    }

    return gearRatio;
  };

  const gearRatio = calculateGearsRatio(
    props.wheelSize,
    props.crank,
    props.casete
  );
  const max = gearRatio[0][gearRatio[0].length - 1];
  const min = gearRatio[gearRatio.length - 1][0];

  const table: GearsRatioTable = {
    tableHead: [""].concat(props.crank.split("-")),
    tableTitle: props.casete.split("-"),
    tableData: gearRatio,

    table2Title: ["Max", "Min"],
    table2Data: [[max], [min]],
  };

  return (
    <>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={table.tableHead}
            flexArr={[1, 2, 1, 1]}
            style={styles.head}
            textStyle={styles.textBold}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={table.tableTitle}
              style={styles.title}
              heightArr={[28, 28]}
              textStyle={styles.textBold}
            />
            <Rows
              data={table.tableData}
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
              data={table.table2Title}
              style={styles.title}
              textStyle={styles.textBold}
              heightArr={[28, 28]}
            />
            <Rows
              data={table.table2Data}
              flexArr={[2, 1, 1]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    </>
  );
}

export default GearsRatioTable;
