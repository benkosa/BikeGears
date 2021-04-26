import { StyleSheet } from "react-native";
import darkc from "../../colors";
const light = StyleSheet.create({
  mainContainer: {},
  container: { flex: 1, padding: 16, paddingTop: 30 },
  container2: { flex: 1, padding: 16, paddingTop: 0 },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  text: { textAlign: "center" },
  textBold: { textAlign: "center", fontWeight: "bold" },
  row: { height: 28 },
});

const dark = StyleSheet.create({
  ...light,
  row: {
    ...light.row,
    backgroundColor: darkc.primary_shade
  },
  head: {
    ...light.row,
    backgroundColor: darkc.secondary_shade
  },
  text: {
    ...light.text,
    color: darkc.light
  },
  textBold: {
    ...light.textBold,
    color: darkc.light
  },
  title: {
    ...light.title,
    backgroundColor: darkc.secondary_shade
  },
});

export default [light, dark];
