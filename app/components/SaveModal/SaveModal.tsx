import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import LoginButton from "../LoginButton/LoginButton";
import * as firebase from "firebase";

class SaveModal extends Component<saveModalProps> {
  constructor(props: saveModalProps) {
    super(props);
    this.state = {
      modalVisible: false,
      text: ""
    };
  }

  handleSend = async () => {
    const token = firebase.auth().currentUser?.uid;

    if (token) {
      firebase.firestore().collection("setup_"+token).add({
        title: this.state.text,
        setup: this.props.setup,
      });
    }
  };

  setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { modalVisible } = this.state;

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          supportedOrientations={["landscape", "portrait"]}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <TouchableOpacity
              style={styles.modal}
              onPress={() => console.log("do nothing")}
              activeOpacity={1}
            >
              {/**modal content */}
              <View style={styles.modalView}>
                <TextInput
                  style={{ height: 40 }}
                  placeholder="Setup name"
                  onChangeText={(value) => this.setState({ text: value })}
                  defaultValue={this.state.text}
                />
                {!this.props.isLogged && (
                  <LoginButton
                    title="Sign in and save"
                    onPress={() => {
                      this.setModalVisible(!modalVisible);
                      this.handleSend();
                    }}
                    disabled={this.state.text == ""}
                  ></LoginButton>
                )}
                {this.props.isLogged && (
                  <Button
                    onPress={() => {
                      this.setModalVisible(!modalVisible);
                      this.handleSend();
                    }}
                    title="Save"
                    disabled={this.state.text == ""}
                  />
                )}
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Save</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SaveModal;
