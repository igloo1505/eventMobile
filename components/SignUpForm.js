import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import {
  SignUpFormStep1,
  SignUpFormStep2,
  SignUpFormStep3,
  SignUpFormStep4,
  ConfirmationScreen,
} from "./SignUpFormStep";

import { SIGN_UP_FORM, SWITCH_TO_ADMIN_REGISTER } from "../actions/Types";
import { submitNewUser, submitNewAdminUser } from "../actions/userActions";
import { Input } from "react-native-elements";
import { connect, useDispatch } from "react-redux";
import { Text, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Card from "../components/UI/Card";
import { LinearGradient } from "expo-linear-gradient";
import { loginUser, switchToAdminRegister } from "../actions/userActions";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
// import Input from "../components/UI/Input";
import Colors from "../constants/Colors";
import { debug } from "react-native-reanimated";

const SignUpForm = ({ user, submitNewUser, props }) => {
  const [formStep, setFormStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [password1, setpassword1] = useState("");
  const [userLocalState, setUserLocalState] = useState("");
  const [city, setCity] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const SubmitNewUser = () => {
    let newUser = {
      name,
      email,
      password: password1,
      admin,
      city,
      state: userLocalState,
    };

    if (admin) {
      dispatch({ type: SWITCH_TO_ADMIN_REGISTER, payload: newUser });
      navigation.navigate("registerBusiness");
    } else if (!admin) {
      submitNewUser(newUser);
    }
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
            {!admin && formStep === 3 && (
              <Text
                style={{
                  color: Colors.textColor,
                  marginHorizontal: 50,
                  marginBottom: 40,
                  fontSize: 20,
                }}
              >
                "Almost done! Tell us a little about where you live so we can
                prioritize events near you."{" "}
              </Text>
            )}

            {formStep === 1 && (
              <SignUpFormStep1
                name={name}
                email={email}
                setEmail={setEmail}
                setName={setName}
                setAdmin={setAdmin}
                admin={admin}
                setFormStep={setFormStep}
              />
            )}

            {/* {formStep === 1 && navigation.navigate("registerBusiness")} */}

            {formStep === 2 && (
              <SignUpFormStep2
                setFormStep={setFormStep}
                setpassword1={setpassword1}
                password1={password1}
              />
            )}
            {formStep === 3 && (
              <SignUpFormStep3
                setFormStep={setFormStep}
                setCity={setCity}
                admin={admin}
                state={userLocalState}
                setUserLocalState={setUserLocalState}
              />
            )}
            {formStep === 4 && (
              <SignUpFormStep4
                setFormStep={setFormStep}
                formStep={formStep}
                state={userLocalState}
                setState={setUserLocalState}
              />
            )}
            {formStep === 5 && (
              <ConfirmationScreen
                state={userLocalState}
                name={name}
                email={email}
                city={city}
                SubmitNewUser={SubmitNewUser}
              />
            )}
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

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  props: ownProps,
});

export default connect(mapStateToProps, { submitNewUser })(SignUpForm);
