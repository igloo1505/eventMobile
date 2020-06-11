import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Platform,
} from "react-native";
import { SIGN_UP_FORM, SET_LOADING } from "../actions/Types";
import { Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Text, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Card from "../components/UI/Card";
import { LinearGradient } from "expo-linear-gradient";
import { loginUser } from "../actions/userActions";

// import Input from "../components/UI/Input";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

// TODO go back and fix errorMessage so it conditionally renders. Right now if uncommented it shows up regardless

const SignInForm = ({ user, loginUser }, props) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toggleForm = () => {
    dispatch({ type: SIGN_UP_FORM });
  };

  const handleSubmit = () => {
    let User = { email, password };
    console.log("Login User", User);
    dispatch({ type: SET_LOADING, payload: true });
    loginUser(User);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        height: "100%",
      }}
      enabled="true"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flex: 1, alignContent: "center" }}>
          <View style={styles.formStyle}>
            {/* <LinearGradient
        colors={[Colors.primaryColor, Colors.accentColor]}
        style={styles.gradientStyle}
      > */}
            <Card style={styles.loginCard}>
              <Input
                placeholder="Email"
                label="Email"
                onChangeText={(text) => setEmail(text)}
                textContentType="username"
                keyboardType="default"
                autoCapitalize="none"
                // errorMessage="Please enter a valid password"
                leftIcon={
                  <AntDesign
                    name="mail"
                    size={20}
                    color="black"
                    style={styles.iconStyle}
                  />
                }
              />
              <Input
                placeholder="Password"
                secureTextEntry
                label="Password"
                minLength={8}
                textContentType="password"
                onChangeText={(text) => setPassword(text)}
                // errorMessage="Please enter a valid password"
                leftIcon={
                  <AntDesign
                    name="lock"
                    size={24}
                    color="black"
                    style={styles.iconStyle}
                  />
                }
              />
              <Button
                // bordered
                block
                onPress={handleSubmit}
                style={styles.buttonStyle}
                title="Login"
              >
                <Text>Login</Text>
              </Button>
              <Button
                bordered
                block
                onPress={() => dispatch({ type: SIGN_UP_FORM })}
                style={styles.switchButtonStyle}
                title="SignUp"
              >
                <Text style={{ color: "black" }}>Sign Up</Text>
              </Button>
            </Card>
            {/* </LinearGradient> */}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginCard: {
    width: "80%",
    margin: 20,
    padding: 10,
    // height: "auto",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollStyle: {
    height: "100%",
    flex: 1,
    width: "100%",
    // padding: 24,
    // alignContent: "center",
    // alignItems: "center",
    // justifyContent: "center",
  },
  formStyle: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.defaultPrimary,
  },
  switchButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.defaultPrimary,
    marginTop: 5,
  },
  iconStyle: {
    padding: 5,
  },
  gradientStyle: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loginUser })(SignInForm);
