import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

function SavedScreen() {
  const handlePress = () => console.log("test");
  return (
    <SafeAreaView>
      <Text numberOfLines={2} onPress={handlePress}>
        SavedScreen
      </Text>
    </SafeAreaView>
  );
}

export default SavedScreen;
