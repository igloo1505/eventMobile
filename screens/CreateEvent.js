import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import moment from "moment";
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
  CreateEventForm3,
  CreateEventForm4,
} from "../components/CreateEventFormList";

const CreateEvent = (props) => {
  let today = new Date();
  let todayString = moment(today).format("MM-DD-YYYY");

  const [dateString, setDateString] = useState(todayString);
  const [formStep, setFormStep] = useState(1);
  const [showDateTime, setShowDateTime] = useState(1);
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("Event Type");
  const [eventTags, setEventTags] = useState([]);
  const [date, setDate] = useState(today.toUTCString());
  const [eventDescription, setEventDescription] = useState("");
  const [time, setTime] = useState(null);
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
            {formStep === 3 && (
              <CreateEventForm3
                setFormStep={setFormStep}
                date={date}
                dateString={dateString}
                setDateString={setDateString}
                time={time}
                setDate={setDate}
                setTime={setTime}
                showDateTime={showDateTime}
                setShowDateTime={setShowDateTime}
              />
            )}
            {formStep === 4 && (
              <CreateEventForm4
                setFormStep={setFormStep}
                visible={visible2}
                setVisible={setVisible2}
                eventDescription={eventDescription}
                setEventDescription={setEventDescription}
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
