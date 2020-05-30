import React from "react";
import { View, Text, Button, Platform } from "react-native";
import Colors from "../constants/Colors";

const Landing = (props) => {
  console.log("props: ", props);
  return (
    <View>
      <Text>Landing Page goes here</Text>
      <Button
        title="redirect"
        onPress={() => props.navigation.navigate({ routeName: "ViewEvents" })}
      />
    </View>
  );
};

Landing.navigationOptions = {
  headerTitle: "Login",
};

export default Landing;
