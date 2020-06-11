import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "native-base";
import Card from "./UI/Card";
import { connect } from "react-redux";
import UniversalOverlay from "./AdminSwitchOverlay";
import AppConstants from "../constants/AppConstants";
import Colors from "../constants/Colors";

export const SetDifferent1 = (props) => {
  const evaluateForm1 = () => {
    if (props.newCity === "" || props.newState === "" || props.newZip === "") {
      Alert.alert(
        "So close yet so far.",
        "We need to know where this event is located. If we can't find it it's unlikely any users will."
      );
    } else {
      props.setFormStep(7);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <UniversalOverlay
        textMiddle="You're all set. Your event should be visible to others in a minute or two."
        textTop="Great News!"
        isVisible={isVisible}
        visible={isVisible}
      />
      <Text style={{ fontSize: 26, color: Colors.textColor }}>
        Event Location
      </Text>
      <Card style={styles.cardStyle}>
        <Input
          placeholder="City"
          label="City"
          onChangeText={(text) => props.setNewCity(text)}
          keyboardType="default"
          enablesReturnKeyAutomatically={true}
          autoCapitalize="sentences"
          value={props.newCity}
          containerStyle={{ marginHorizontal: 20 }}
          inputContainerStyle={{ marginTop: 16 }}
          inputStyle={{ width: 150 }}
        />
        <Input
          placeholder="State"
          label="State"
          onChangeText={(text) => props.setNewState(text)}
          keyboardType="default"
          enablesReturnKeyAutomatically={true}
          autoCapitalize="sentences"
          value={props.newState}
          containerStyle={{ marginHorizontal: 20 }}
          inputContainerStyle={{ marginTop: 16 }}
          inputStyle={{ width: 150 }}
        />
        <Input
          placeholder="90210"
          label="ZipCode"
          onChangeText={(text) => props.setNewZip(text)}
          keyboardType="number-pad"
          enablesReturnKeyAutomatically={true}
          value={props.newZip}
          containerStyle={{ marginHorizontal: 20 }}
          inputContainerStyle={{ marginTop: 16 }}
          inputStyle={{ width: 150 }}
        />

        <Button
          bordered
          style={AppConstants.defaultButtonStyle}
          onPress={() => evaluateForm1()}
        >
          <Text style={AppConstants.defaultButtonTextStyle}>Continue</Text>
        </Button>
        <Button
          bordered
          dark
          block
          style={AppConstants.defaultBackButtonStyle}
          onPress={() => props.setFormStep(5)}
        >
          <Text style={AppConstants.defaultBackButtonTextStyle}>Back</Text>
        </Button>
      </Card>
    </View>
  );
};

const SetDifferent2 = ({ props }) => {
  const [isVisible, setIsVisible] = useState(false);

  const evaluateForm2 = () => {
    if (props.streetAddress === "") {
      Alert.alert("Oh You're so close!", "Please enter a valid location");
    }
    props.handleSubmitNewLocation();
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      props.navigation.navigate("By Neighborhood");
      // props.setFormStep(7);
    }, 3000);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        width: "100%",
        marginTop: 20,
        justifyContent: "center",
      }}
    >
      <UniversalOverlay
        textMiddle="You're all set. Your event should be visible to others in a minute or two."
        textTop="Great News!"
        isVisible={isVisible}
        visible={isVisible}
        setIsVisible={setIsVisible}
      />
      <Text style={{ fontSize: 26, color: Colors.textColor }}>
        Event Location
      </Text>
      <Card style={styles.cardStyle}>
        <Input
          placeholder="1234 N Main Street"
          label="Street Address"
          onChangeText={(text) => props.setNewStreetAddress(text)}
          keyboardType="default"
          enablesReturnKeyAutomatically={true}
          value={props.newStreetAddress}
          containerStyle={{ marginHorizontal: 20 }}
          inputContainerStyle={{ marginTop: 16 }}
          inputStyle={{ width: 150 }}
        />
        <Input
          placeholder="Unit Number"
          label="Unit #"
          onChangeText={(text) => props.setNewUnit(text)}
          keyboardType="default"
          enablesReturnKeyAutomatically={true}
          value={props.newUnit}
          containerStyle={{ marginHorizontal: 20 }}
          inputContainerStyle={{ marginTop: 16 }}
          inputStyle={{ width: 150 }}
        />
        <View>
          <Button
            bordered
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
            onPress={() => props.setFormStep(6)}
          >
            <Text style={AppConstants.defaultBackButtonTextStyle}>Back</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  props: ownProps,
});

export default connect(mapStateToProps)(SetDifferent2);

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
