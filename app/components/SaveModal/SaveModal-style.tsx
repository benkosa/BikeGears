import { StyleSheet } from "react-native";
import darkc from "../../colors";

const light = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledbutton: {},
  textInput: {
    height: 40
  }
});

const dark = StyleSheet.create({
  ...light,
  modalView: {
    ...light.modalView,
    backgroundColor: darkc.secondary_shade
  },
  disabledbutton: {
    backgroundColor: darkc.primary_shade
  },
  textInput: {
    ...light.textInput,
    color: darkc.light
  },
});

export default [light, dark];
