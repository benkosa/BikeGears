import React, { Component } from "react";
import {
  Modal,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import LoginButton from "../LoginButton/LoginButton";
import * as firebase from "firebase";

import styles from "./SaveModal-style";
import darkc from "../../colors";
import { connect } from "react-redux";

class SaveModal extends Component<saveModalProps> {
  constructor(props: saveModalProps) {
    super(props);
    this.state = {
      modalVisible: false,
      text: "",
    };
  }

  handleSend = async () => {
    const token = firebase.auth().currentUser?.uid;

    if (token) {
      firebase
        .firestore()
        .collection("setup_" + token)
        .add({
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
    const styleId = +this.props.global.selectedApirence;
    const style = styles[styleId];

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
            style={style.modalContainer}
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <TouchableOpacity
              style={style.modal}
              onPress={() => console.log("do nothing")}
              activeOpacity={1}
            >
              {/**modal content */}
              <View style={style.modalView}>
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
          style={[style.button, style.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={style.textStyle}>Save</Text>
        </Pressable>
      </View>
    );
  }
}

const mapStateToProps = (state: { global: any }) => {
  const { global } = state;
  return { global };
};

export default connect(mapStateToProps)(SaveModal);
