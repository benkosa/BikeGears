interface GearsRatioTable {
  tableHead: Array<string>;
  tableTitle: Array<string>;
  tableData: Array<Array<number>>;

  table2Title: Array<string>;
  table2Data: Array<Array<number>>;
}

interface GearsRatioTableProps {
  wheelSize: number;
  crank: string;
  cassette: string;
}

interface PickerItem {
  label: string;
  value: string;
  color?: string;
}

interface ActualSetup {
  wheelSize: string;
  crankSize: string;
  cassetteSize: string;
  crank: string;
  cassette: string;
}

type LoginButtonProps = {
  title: string;
  onPress?(): void;
  disabled?: boolean
};

interface saveModalProps {
  setup: ActualSetup;
  isLogged: boolean;
}
