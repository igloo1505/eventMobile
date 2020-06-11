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
import { registerEvent } from "../actions/eventActions";
import {
  CreateEventForm1,
  CreateEventForm2,
  CreateEventForm3,
  CreateEventForm4,
  CreateEventForm5,
} from "../components/CreateEventFormList";
import SetDifferent2, { SetDifferent1 } from "../components/DifferentLocation";
import { useSelector, connect } from "react-redux";

const CreateEvent = ({ props, registerEvent }) => {
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
  const [timeString, setTimeString] = useState("18:00");
  const [location, setLocation] = useState(null);
  const [socialDistanceFriendly, setSocialDistanceFriendly] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newStreetAddress, setNewStreetAddress] = useState("");
  const [newZip, setNewZip] = useState("");
  const [newUnit, setNewUnit] = useState("");
  let userEmail = useSelector((state) => state.user.user.email);
  let user_id = useSelector((state) => state.user.user._id);

  const resetState = () => {
    setFormStep(1);
    setDateString(todayString);
    setShowDateTime(1);
    setVisible(true);
    setVisible2(true);
    setEventName("");
    setEventType("Event Type");
    setEventTags([]);
    setDate(today.toUTCString());
    setEventDescription("");
    setTime(null);
    setTimeString("18:00");
    setLocation({});
    setSocialDistanceFriendly(false);
    setNewCity("");
    setNewState("");
    setNewStreetAddress("");
    setNewZip("");
    setNewUnit("");
  };

  const HandleFinalSubmit = () => {
    let readyToSubmit = {
      eventName,
      eventType,
      eventTags,
      eventDateTime: {
        date,
        time,
      },
      socialDistanceFriendly,
      submittedBy: {
        email: userEmail,
        user_id: user_id,
      },
      eventDescription,
      eventLocation: {
        location: location,
      },
    };
    registerEvent(readyToSubmit);
    props.navigation.navigate("By Neighborhood");
    resetState();
  };
  const handleSubmitNewLocation = () => {
    let newLocation = {};
    newLocation.city = newCity;
    newLocation.state = newState;
    newLocation.zipCode = newZip;
    newLocation.streetAddress = newStreetAddress;
    newLocation.unit = newUnit;
    let readyToSubmit = {
      eventName,
      eventType,
      eventTags,
      eventDateTime: {
        date,
        time,
      },
      socialDistanceFriendly,
      submittedBy: {
        email: userEmail,
        user_id: user_id,
      },
      eventDescription,
      eventLocation: {
        location: newLocation,
      },
    };
    registerEvent(readyToSubmit);
    resetState();
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
                timeString={timeString}
                setTimeString={setTimeString}
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
            {formStep === 5 && (
              <CreateEventForm5
                setFormStep={setFormStep}
                eventDescription={eventDescription}
                dateString={dateString}
                eventName={eventName}
                eventType={eventType}
                eventTags={eventTags}
                eventDescription={eventDescription}
                eventTime={time}
                location={location}
                setLocation={setLocation}
                navigation={props.navigation}
                HandleFinalSubmit={HandleFinalSubmit}
              />
            )}
            {formStep === 6 && (
              <SetDifferent1
                setFormStep={setFormStep}
                setNewCity={setNewCity}
                newCity={newCity}
                newState={newState}
                setNewState={setNewState}
                handleSubmitNewLocation={handleSubmitNewLocation}
                newZip={newZip}
                setNewZip={setNewZip}
              />
            )}
            {formStep === 7 && (
              <SetDifferent2
                setNewStreetAddress={setNewStreetAddress}
                newStreetAddress={newStreetAddress}
                newUnit={newUnit}
                setNewUnit={setNewUnit}
                handleSubmitNewLocation={handleSubmitNewLocation}
                navigation={props.navigation}
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

export default connect(mapStateToProps, { registerEvent })(CreateEvent);

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
