import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

function LandingScreen() {
  const handlePress = () => console.log("test");
  return (
    <SafeAreaView>
      <Text numberOfLines={2} onPress={handlePress}>
        LandingScreen
      </Text>
    </SafeAreaView>
  );
}

export default LandingScreen;
