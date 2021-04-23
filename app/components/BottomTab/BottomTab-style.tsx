import { StyleSheet } from "react-native";
import darkc from "../../colors";

const light = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    color: "black",
  },
  background: {
    backgroundColor: "white",
  }
});

const dark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkc.primary,
  },
  icon: {
    color: darkc.light,
  },
  background: {
    backgroundColor: darkc.primary_shade,
  }
});

export default [light, dark];
