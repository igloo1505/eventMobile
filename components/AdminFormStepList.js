import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import StateSelectDropdown from "./StateSelectDropdown";
import Card from "../components/UI/Card";
import { Input } from "react-native-elements";
import { Button } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import AppConstants from "../constants/AppConstants";
import BusinessTypePicker from "./BusinessTypePicker";
import Colors from "../constants/Colors";
import AdminSwitchOverlay from "./AdminSwitchOverlay";

export const AdminFormStep1 = (props) => {
  const [dropDownText, setDropDownText] = useState("Business Type");
  console.log(props);
  const evaluateNameInput = () => {
    if (props.businessName.length < 6) {
      Alert.alert(
        "Are you sure?",
        "That name is pretty short. Make it a little longer so people can find it."
      );
    } else if (props.businessType === "") {
      Alert.alert(
        "Woah woah woah.",
        "Add a business type so people looking for places like yours can find your events."
      );
    } else if (
      props.businessName.length >= 6 &&
      props.businessType !== "Business Type"
    ) {
      props.setFormStep(2);
    }
  };
  return (
    <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
      <AdminSwitchOverlay
        visible={props.visible}
        setVisible={props.setVisible}
      />
      <Card style={styles.cardStyle}>
        <Input
          placeholder="Business Name"
          label="Business Name"
          onChangeText={(text) => props.setBusinessName(text)}
          keyboardType="default"
          autoCapitalize="words"
          value={props.businessName}
          containerStyle={{ marginHorizontal: 20 }}
          inputContainerStyle={{ marginTop: 16 }}
          inputStyle={{ width: 150 }}
        />

        <BusinessTypePicker
          setBusinessType={props.setBusinessType}
          businessType={props.businessType}
          dropDownText={dropDownText}
          setDropDownText={setDropDownText}
        />
        <Button
          bordered
          style={AppConstants.defaultButtonStyle}
          onPress={() => evaluateNameInput()}
        >
          <Text style={AppConstants.defaultButtonTextStyle}>Continue</Text>
        </Button>
      </Card>
    </View>
  );
};

export const AdminFormStep2 = (props) => {
  const [displayErrorState, setDisplayErrorState] = useState(false);
  const displayError = (text) => {
    if (text.length > 0 && text.length !== 5) {
      setDisplayErrorState(true);
    } else if (text.length === 0 || text.length === 5) {
      setDisplayErrorState(false);
    }
  };
  const evaluateForm2 = () => {
    const getDigits = () => {
      let toNum = parseInt(props.businessZip);
      let stringed = JSON.stringify(toNum);

      if (stringed.length === 5) {
        return true;
      } else if (stringed.length !== 5) {
        return false;
      }
    };
    if (props.businessCity.length < 4) {
      Alert.alert("Oh Boy.", "Make sure you enter an accurate city name");
    } else if (!getDigits()) {
      Alert.alert(
        "Oh man...",
        "Make sure you enter a 5 digit zip code so people near by can find your business"
      );
    } else if (props.businessState === "State") {
      Alert.alert(
        "Wooooah",
        "Make sure to enter the state your business operates in. You wont be locked into events in that location alone"
      );
    } else {
      props.setFormStep(3);
      props.displayLastOneText();
    }
  };
  return (
    <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
      <Card style={styles.cardStyle}>
        <Input
          placeholder="City"
          label="City"
          textContentType="addressCity"
          onChangeText={(text) => props.setBusinessCity(text)}
          keyboardType="default"
          autoCapitalize="words"
          value={props.businessCity}
          containerStyle={{ marginHorizontal: 20 }}
          inputStyle={{ width: 150 }}
        />
        <Input
          placeholder="Zip Code"
          label="Zip Code"
          onChangeText={(text) => {
            props.setBusinessZip(text);
            displayError(text);
          }}
          keyboardType="number-pad"
          maxLength={5}
          textContentType="postalCode"
          value={props.businessZip}
          errorMessage={displayErrorState && "Please enter a valid zip code"}
          containerStyle={{ marginHorizontal: 20 }}
          inputStyle={{ width: 150 }}
        />
        <StateSelectDropdown
          businessState={props.businessState}
          setBusinessState={props.setBusinessState}
        />

        <View style={{ width: "100%" }}>
          <Button
            bordered
            block
            style={AppConstants.defaultButtonStyle}
            onPress={() => evaluateForm2()}
          >
            <Text style={AppConstants.defaultButtonTextStyle}>Continue</Text>
          </Button>
          <Button
            bordered
            dark
            block
            style={AppConstants.defaultBackButtonStyle}
            onPress={() => {
              props.setFormStep(1);
              props.setVisible(false);
            }}
          >
            <Text style={AppConstants.defaultBackButtonTextStyle}>Back</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
};

export const AdminFormStep3 = (props) => {
  const evaluateForm3 = () => {
    if (props.businessStreetAddress.length < 10) {
      Alert.alert(
        "Oh Boy.",
        "Make sure you enter the full address, and do not include the city or state"
      );
    } else {
      props.setFormStep(5);
    }
  };
  return (
    <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
      <Card style={styles.cardStyle}>
        <Input
          placeholder="Street Address"
          label="Street Address"
          onChangeText={(text) => props.setBusinessStreetAddress(text)}
          keyboardType="default"
          autoCapitalize="words"
          value={props.businessStreetAddress}
          containerStyle={{ marginHorizontal: 20 }}
          inputStyle={{ width: 150 }}
        />
        <Input
          placeholder="Unit Number"
          label="Unit Number (optional)"
          onChangeText={(text) => {
            props.setBusinessUnit(text);
          }}
          keyboardType="default"
          value={props.businessUnit}
          containerStyle={{ marginHorizontal: 20 }}
          inputStyle={{ width: 150 }}
        />
        <View style={{ width: "100%" }}>
          <Button
            bordered
            block
            style={AppConstants.defaultButtonStyle}
            onPress={() => evaluateForm3()}
          >
            <Text style={AppConstants.defaultButtonTextStyle}>Continue</Text>
          </Button>
          <Button
            bordered
            dark
            block
            style={AppConstants.defaultBackButtonStyle}
            onPress={() => {
              props.setFormStep(2);
            }}
          >
            <Text style={AppConstants.defaultBackButtonTextStyle}>Back</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
};

export const ConfirmAdminInfo = (props) => {
  return (
    <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
      <Card style={styles.cardStyle}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Details:
        </Text>
        <View
          style={{
            marginVertical: 6,

            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", paddingVertical: 5 }}>
            {props.businessName}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 6,

            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", paddingVertical: 5 }}>
            {props.businessType}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 6,

            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", paddingVertical: 5 }}>
            {props.businessStreetAddress}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 6,

            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", paddingVertical: 5 }}>
            {props.businessCity}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 6,

            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", paddingVertical: 5 }}>
            {props.businessState}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 6,

            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", paddingVertical: 5 }}>
            {props.businessZip}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 6,

            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", paddingVertical: 5 }}>
            {props.businessUnit}
          </Text>
        </View>

        <View style={{ width: "100%" }}>
          <Button
            bordered
            block
            style={AppConstants.defaultButtonStyle}
            onPress={() => props.handleAdminSubmit()}
          >
            <Text style={AppConstants.defaultButtonTextStyle}>Confirm</Text>
          </Button>
          <Button
            bordered
            dark
            block
            style={AppConstants.defaultBackButtonStyle}
            onPress={() => {
              props.setFormStep(4);
            }}
          >
            <Text style={AppConstants.defaultBackButtonTextStyle}>
              Back & Edit
            </Text>
          </Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    // width: "90%",
    width: 400,
    maxWidth: "70%",
    // marginHorizontal: 20,
    margin: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    // height: "auto",
  },
});
