interface GearsRatioTable {
    tableHead: Array<string>,
    tableTitle: Array<string>,
    tableData: Array<Array<number>>,

    table2Title: Array<string>,
    table2Data: Array<Array<number>>,
}

interface GearsRatioTableProps {
    wheelSize: number,
    crank: Array<string>,
    casete: Array<string>
}