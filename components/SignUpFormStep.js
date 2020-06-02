import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  StyleSheet,
  Switch,
  Platform,
} from "react-native";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../models/SimpleValidation";
import { SIGN_UP_FORM } from "../actions/Types";
import { AutoCompleteState } from "./SelectStateModal";
import { Input, Tooltip } from "react-native-elements";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Text, Button, Toast, Form, Picker, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Card from "../components/UI/Card";
import { LinearGradient } from "expo-linear-gradient";
import { loginUser } from "../actions/userActions";
// import Input from "../components/UI/Input";
import Colors from "../constants/Colors";
import {
  FlatList,
  State,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { StateArray } from "../models/StateArray";

export const SignUpFormStep1 = (props) => {
  const dispatch = useDispatch();
  const toggleForm = () => {
    dispatch({ type: SIGN_UP_FORM });
  };
  const toggleSwitch = () => {
    props.setAdmin((previousState) => !previousState);
  };
  const CheckForm1 = () => {
    if (!validateName(props.name)) {
      return Alert.alert("Oops", "A valid name is required");
    } else if (!validateEmail(props.email)) {
      console.log(validateEmail(props.email));
      console.log("props.email", props.email);
      return Alert.alert("Oh no.", "A valid email is required");
    } else if (validateName(props.name) && validateEmail(props.email)) {
      props.setFormStep(2);
    }
  };
  return (
    <Card style={styles.loginCard}>
      <Input
        placeholder="Name"
        label="Name"
        onChangeText={(text) => props.setName(text)}
        keyboardType="default"
        autoCapitalize="none"
        value={props.name}
        // errorMessage="Please enter a valid password"
        leftIcon={
          <AntDesign
            name="user"
            size={20}
            color="black"
            style={styles.iconStyle}
          />
        }
      />
      <Input
        placeholder="Email"
        label="Email"
        minLength={8}
        onChangeText={(text) => props.setEmail(text)}
        value={props.email}
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
      <Text>Are you registering a business?</Text>
      <Switch
        trackColor={{ false: "#767577", true: Colors.accentColor }}
        thumbColor={props.admin ? Colors.primaryColor : Colors.light}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={props.admin}
        style={styles.toggleStyle}
      />

      <Button
        // bordered
        block
        onPress={() => CheckForm1()}
        style={styles.buttonStyle}
        title="Continue"
      >
        <Text>Continue</Text>
      </Button>
      <Button
        bordered
        block
        onPress={() => dispatch({ type: SIGN_UP_FORM })}
        style={styles.switchButtonStyle}
        title="SignUp"
      >
        <Text style={{ color: "black" }}>I have an account</Text>
      </Button>
    </Card>
  );
};

export const SignUpFormStep2 = (props) => {
  const [isMatch, setIsMatch] = useState(true);
  let [validPassword, setValidPassword] = useState(null);
  const checkMatch = (text) => {
    if (text === props.password1) {
      setIsMatch(true);
    } else if (text !== props.password1) {
      setIsMatch(false);
    }
  };
  const handlePasswordSubmit = () => {
    debugger;
    if (validatePassword(props.password1)) {
      props.setFormStep(3);
    } else if (!validatePassword(props.password1)) {
      Alert.alert("Oh no.", "Your password needs to be more secure.");
    }
  };
  const handleValidPassword = (text) => {
    props.setpassword1(text);
    setValidPassword(validatePassword(text));
  };
  return (
    <Card style={styles.loginCard}>
      <Input
        placeholder="Create a Password"
        label="Password"
        onChangeText={(text) => handleValidPassword(text)}
        keyboardType="default"
        autoCapitalize="none"
        secureTextEntry
        errorMessage={
          !validPassword && validPassword !== null
            ? "Password needs to be more secure"
            : ""
        }
        leftIcon={
          <AntDesign
            name="lock"
            size={20}
            color="black"
            style={styles.iconStyle}
          />
        }
      />
      <Input
        placeholder="Confirm Password"
        label="Confirm Password"
        minLength={8}
        onChangeText={(text) => checkMatch(text)}
        errorMessage={isMatch ? "" : "Passwords must match"}
        errorStyle={styles.errorNoMatch}
        secureTextEntry
        leftIcon={
          <AntDesign
            name="lock"
            size={20}
            color="black"
            style={styles.iconStyle}
          />
        }
      />

      <Button
        // bordered
        block
        onPress={() => handlePasswordSubmit()}
        style={styles.buttonStyle}
        title="Continue"
      >
        <Text>Continue</Text>
      </Button>
      <Button
        bordered
        block
        onPress={() => props.setFormStep(1)}
        style={styles.switchButtonStyle}
        title="Back"
      >
        <Text style={{ color: "black" }}>Back</Text>
      </Button>
    </Card>
  );
};

export const SignUpFormStep3 = (props) => {
  return (
    <Card style={styles.loginCard}>
      <Form style={{ width: "100%" }}>
        <Input
          placeholder="City"
          label="City"
          onChangeText={(text) => props.setCity(text)}
          keyboardType="default"
          autoCapitalize="words"
          leftIcon={
            <Ionicons
              name="md-locate"
              size={20}
              color="black"
              style={styles.iconStyle}
            />
          }
        />

        <Button
          // bordered
          block
          onPress={() => props.setFormStep(4)}
          style={styles.buttonStyle}
          title="Continue"
        >
          <Text>Continue</Text>
        </Button>
        <Button
          bordered
          block
          onPress={() => props.setFormStep(2)}
          style={styles.switchButtonStyle}
          title="Back"
        >
          <Text style={{ color: "black" }}>Back</Text>
        </Button>
      </Form>
    </Card>
  );
};

export const SignUpFormStep4 = (props) => {
  const handleStateSubmit = (stateTitle) => {
    props.setState(stateTitle);
    props.setFormStep(5);
    console.log("formStep", props.formStep);
  };

  function Item({ title }) {
    return (
      <TouchableOpacity onPress={() => handleStateSubmit(title)}>
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.loginCard}>
      <FlatList
        data={StateArray}
        renderItem={({ item }) => <Item title={item.state} />}
        style={styles.StateListStyle}
        showsVerticalScrollIndicator={false}
      />

      <Button
        bordered
        block
        onPress={() => props.setFormStep(3)}
        style={styles.stateButtonStyle}
        title="Back"
      >
        <Text style={{ color: Colors.dark }}>Back</Text>
      </Button>
    </View>
  );
};

export const ConfirmationScreen = (props) => {
  return (
    <Card style={styles.loginCard}>
      <ScrollView>
        <View style={styles.confirmationTextHolder}>
          <Text style={{ fontWeight: "bold", padding: 5 }}>Name:</Text>
          <Text style={styles.confirmationTextStyle}>{props.name}</Text>
        </View>
        <View style={styles.confirmationTextHolder}>
          <Text style={{ fontWeight: "bold", padding: 5 }}>Email:</Text>
          <Text style={styles.confirmationTextStyle}>{props.email}</Text>
        </View>
        <View style={styles.confirmationTextHolder}>
          <Text style={{ fontWeight: "bold", padding: 5 }}>From: </Text>
          <Text style={styles.confirmationTextStyle}>
            {props.city}, {props.state}
          </Text>
        </View>
        <Button
          // bordered
          block
          onPress={() => props.SubmitNewUser()}
          style={styles.confirmButtonStyle}
          title="finalSubmit"
        >
          <Text>Confirm & Register</Text>
        </Button>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  confirmationTextStyle: {
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  confirmationTextHolder: {
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 10,
  },
  loginCard: {
    width: "80%",
    margin: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    // height: "auto",
  },
  errorMatch: {
    display: "none",
  },
  errorNoMatch: {
    padding: 5,
    fontSize: 14,
  },
  StateListStyle: {
    color: Colors.primaryColor,
    backgroundColor: Colors.light,
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    paddingVertical: 9,
    marginVertical: 2,
    textAlign: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  title: {
    textAlign: "center",
    marginVertical: 2,
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
  toggleStyle: {
    marginBottom: 8,
    marginTop: 8,
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
  confirmButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.defaultPrimary,
    marginVertical: 15,
  },
  switchButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.defaultPrimary,
    marginTop: 5,
  },
  stateButtonStyle: {
    backgroundColor: Colors.light,
    borderColor: "black",
    borderWidth: 1,
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
