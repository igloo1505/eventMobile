import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>About Goes Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default AboutScreen;
