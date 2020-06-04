import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
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
import {
  CreateEventForm1,
  CreateEventForm2,
} from "../components/CreateEventFormList";

const CreateEvent = (props) => {
  const [formStep, setFormStep] = useState(1);
  const [visible, setVisible] = useState(true);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("Event Type");
  const [eventTags, setEventTags] = useState([]);
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
            {formStep === 1 && (
              <CreateEventForm1
                eventName={eventName}
                setEventName={setEventName}
                eventType={eventType}
                setEventType={setEventType}
                formStep={formStep}
                setFormStep={setFormStep}
              />
            )}
            {formStep === 2 && (
              <CreateEventForm2
                visible={visible}
                setVisible={setVisible}
                formStep={formStep}
                setFormStep={setFormStep}
                eventTags={eventTags}
                setEventTags={setEventTags}
              />
            )}
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateEvent;
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
