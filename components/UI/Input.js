import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const textChangeHandler = (e) => {
    console.log("running textCHange handler");
    console.log("e", e);
    // console.log(text);
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        // value={formState.inputValues.title}
        onChangeText={(e) => textChangeHandler(e)}
      />
      {/* {!formState.inputValidities.title && <Text>{props.errorMessage}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    // fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default Input;
