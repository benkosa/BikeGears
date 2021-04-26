import { StyleSheet } from "react-native";
import darkc from "../../colors";
const light = StyleSheet.create({
    background: {},
    text: {},
    notice: {
        paddingBottom: 20,
        paddingTop: 100,
        textAlign: "center",
        fontSize: 16
    },
});

const dark = StyleSheet.create({
  ...light,
  background: {
    backgroundColor: darkc.primary_shade,
    borderColor:darkc.primary
  },
  text: {
    color: darkc.light,
  },
});

export default [light, dark];
