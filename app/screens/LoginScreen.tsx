import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

function LoginScreen() {
  const handlePress = () => console.log("test");
  return (
    <SafeAreaView>
      <Text numberOfLines={2} onPress={handlePress}>
        LoginScreen
      </Text>
    </SafeAreaView>
  );
}

export default LoginScreen;
