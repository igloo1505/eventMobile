import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import Card from "../components/UI/Card";
import {
  AdminFormStep1,
  AdminFormStep2,
  AdminFormStep3,
  ConfirmAdminInfo,
} from "./AdminFormStepList";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import { set } from "react-native-reanimated";
import { connect, useDispatch } from "react-redux";
import { submitNewAdminUser } from "../actions/userActions";
const AdminFormSteps = ({
  user: {
    userAdminDataHolder: { name, email, password, admin, city, state },
  },
  submitNewAdminUser,
  props,
}) => {
  const [visible, setVisible] = useState(true);
  const [formStep, setFormStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Business Type");
  const [businessCity, setBusinessCity] = useState("");
  const [businessZip, setBusinessZip] = useState(0);
  const [businessState, setBusinessState] = useState("State");
  const [businessStreetAddress, setBusinessStreetAddress] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");

  const displayLastOneText = () => {
    setTimeout(() => setFormStep(4), 3000);
  };

  const dispatch = useDispatch();
  const handleAdminSubmit = () => {
    let newAdmin = {
      name,
      email,
      password,
      admin,
      organization: {
        businessName,
        businessType,
        location: {
          business_city: businessCity,
          business_state: businessState,
          business_zip: businessZip,
          business_address: businessStreetAddress,
          business_unit: businessUnit,
        },
      },
      city,
      state,
    };

    submitNewAdminUser(newAdmin);
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
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ width: "100%" }}
      >
        <LinearGradient
          colors={[Colors.primaryColor, Colors.accentColor]}
          style={styles.gradientStyle}
        >
          <View style={styles.formStyle}>
            {formStep === 2 && (
              <View>
                <Text
                  style={{
                    color: Colors.textColor,
                    textAlign: "center",
                    marginTop: 50,
                    maxWidth: "70%",
                    fontSize: 16,
                  }}
                >
                  To help users find events near by we just need some
                  information about the location of your business.
                </Text>
                <Text
                  style={{
                    color: Colors.textColor,
                    textAlign: "center",
                    marginTop: 20,
                    maxWidth: "70%",
                    fontSize: 16,
                  }}
                >
                  Don't worry. You'll be able to post events at other locations
                  as well.
                </Text>
              </View>
            )}
            {formStep === 3 && (
              <View>
                <Text
                  style={{
                    color: Colors.textColor,
                    textAlign: "center",
                    marginTop: 50,
                    maxWidth: "70%",
                    fontSize: 25,
                  }}
                >
                  Last One!
                </Text>
              </View>
            )}
            {formStep === 1 && (
              <AdminFormStep1
                businessName={businessName}
                setBusinessName={setBusinessName}
                setBusinessType={setBusinessType}
                visible={visible}
                setVisible={setVisible}
                businessType={businessType}
                setFormStep={setFormStep}
              />
            )}
            {formStep === 2 && (
              <AdminFormStep2
                businessCity={businessCity}
                setBusinessCity={setBusinessCity}
                visible={visible}
                businessZip={businessZip}
                setBusinessZip={setBusinessZip}
                setVisible={setVisible}
                businessState={businessState}
                setBusinessState={setBusinessState}
                setFormStep={setFormStep}
                displayLastOneText={displayLastOneText}
              />
            )}
            {formStep === 4 && (
              <AdminFormStep3
                businessStreetAddress={businessStreetAddress}
                setBusinessStreetAddress={setBusinessStreetAddress}
                setFormStep={setFormStep}
                businessUnit={businessUnit}
                setBusinessUnit={setBusinessUnit}
              />
            )}
            {formStep === 5 && (
              <ConfirmAdminInfo
                businessCity={businessCity}
                businessUnit={businessUnit}
                businessType={businessType}
                businessName={businessName}
                businessState={businessState}
                businessZip={businessZip}
                businessStreetAddress={businessStreetAddress}
                handleAdminSubmit={handleAdminSubmit}
              />
            )}
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  props: ownProps,
});

export default connect(mapStateToProps, { submitNewAdminUser })(AdminFormSteps);

const styles = StyleSheet.create({
  formStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientStyle: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
