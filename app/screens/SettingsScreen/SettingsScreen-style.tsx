import { StyleSheet } from "react-native";
import darkc from "../../colors";

const light = StyleSheet.create({
  container: {
    flex: 1,
  },
  signOutContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  background: {},
  text: {},
  button: {},
  buttonPasive: {},
  border: {},
  innerBorder: {},
});

const dark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkc.primary,
  },
  signOutContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  background: {
    backgroundColor: darkc.primary_shade,
    borderColor:darkc.primary
  },
  button: {
    backgroundColor: darkc.secondary,
  },
  buttonPasive: {
    backgroundColor: darkc.secondary_shade,
  },
  text: {
    color: darkc.light,
  },
  innerBorder: {color:"black"},
  border: {
    borderColor:darkc.primary_shade
  }
});

export default [light, dark];
