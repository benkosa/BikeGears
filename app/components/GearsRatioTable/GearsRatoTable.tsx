import React, { Component } from "react";
import { View } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { connect } from "react-redux";

import styles from "./GearsRatioTable-style";

/**
 * komponent zobrazi tabulku gear ratio podla
 * navolenych parametrov
 * @param props
 * @returns
 */
class GearsRatioTable extends Component<GearsRatioTableProps> {
  constructor(props: GearsRatioTableProps) {
    super(props);
    this.state = {};
  }
  /**
   * Funkcia vypocita gear ratio podla navolenych
   * parametrov
   *
   * @param wheelSize
   * @param crankS
   * @param caseteS
   * @returns
   */
  calculateGearsRatio = (
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

  gearRatio = this.calculateGearsRatio(this.props.wheelSize, this.props.crank, this.props.cassette);
  max = this.gearRatio[0][this.gearRatio[0].length - 1];
  min = this.gearRatio[this.gearRatio.length - 1][0];

  /**
   * pripravene date pre tabulku
   */
  table: GearsRatioTableData = {
    tableHead: [""].concat(this.props.crank.split("-")),
    tableTitle: this.props.cassette.split("-"),
    tableData: this.gearRatio,

    table2Title: ["Max", "Min"],
    table2Data: [[this.max], [this.min]],
  };

  

  render() {
    const styleId = +this.props.global.selectedApirence;
    const style = styles[styleId];

    return (
      <View style={style.mainContainer}>
        <View style={style.container}>
          <Table borderStyle={{ borderWidth: 1 }}>
            <Row
              data={this.table.tableHead}
              flexArr={[1, 2, 1, 1]}
              style={style.head}
              textStyle={style.textBold}
            />
            <TableWrapper style={style.wrapper}>
              <Col
                data={this.table.tableTitle}
                style={style.title}
                heightArr={[28, 28]}
                textStyle={style.textBold}
              />
              <Rows
                data={this.table.tableData}
                flexArr={[2, 1, 1]}
                style={style.row}
                textStyle={style.text}
              />
            </TableWrapper>
          </Table>
        </View>
        <View style={style.container2}>
          <Table borderStyle={{ borderWidth: 1 }}>
            <TableWrapper style={style.wrapper}>
              <Col
                data={this.table.table2Title}
                style={style.title}
                textStyle={style.textBold}
                heightArr={[28, 28]}
              />
              <Rows
                data={this.table.table2Data}
                flexArr={[2, 1, 1]}
                style={style.row}
                textStyle={style.text}
              />
            </TableWrapper>
          </Table>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: { global: any }) => {
  const { global } = state;
  return { global };
};

export default connect(mapStateToProps)(GearsRatioTable);
