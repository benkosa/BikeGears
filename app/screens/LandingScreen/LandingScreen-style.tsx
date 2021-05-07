
import { StyleSheet } from "react-native";
import darkc from "../../colors";

const light = StyleSheet.create({
    menu: {
      height: 150,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    menuItem: {
      height: 155,
      paddingTop: 2,
      backgroundColor: "white",
      flex: 1,
      alignItems: 'center',
    },
    image: {
      width: 60,
      height: 60.
    },
    addView: {
      flexDirection: "row",
    },
    label: {
      paddingTop: 13,
      fontWeight: "bold",
    },
    notice: {
      flexDirection: "row",
      alignSelf: "center",
      paddingTop: 40
    }
  });

  const dark = StyleSheet.create({
    ...light,
    menuItem: {
      ...light.menuItem,
      backgroundColor: darkc.secondary_shade
    },
    label: {
      ...light.label,
      color: darkc.light
    }
  });

  export default [light, dark];