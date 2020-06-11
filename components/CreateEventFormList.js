import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import EventTypeDropdown from "./EventTypeDropdown";
import { Button } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "react-native-elements";
import Card from "./UI/Card";
import UniversalOverlay from "./AdminSwitchOverlay";
import AppConstants from "../constants/AppConstants";
import Colors from "../constants/Colors";
export const CreateEventForm1 = (props) => {
  const evaluateEventNameType = () => {
    if (props.eventName.length < 5 || props.eventName.length > 15) {
      Alert.alert(
        "Woah Buddy",
        "Make sure your name is long enough to give people an idea of what to expect. You'll be able to add a description in a second."
      );
    } else if (props.eventType === "Event Type") {
      Alert.alert(
        "Oh no",
        "Make sure to pick an the most relevant event type. If you don't see a category that's close see the about page for information on how to contact us and create a new one."
      );
    } else {
      props.setFormStep(2);
    }
  };
  return (
    <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
      <Card style={styles.cardStyle}>
        <Input
          placeholder="Event Name"
          label="Give your event a name"
          onChangeText={(text) => props.setEventName(text)}
          keyboardType="default"
          autoCapitalize="words"
          value={props.eventName}
          containerStyle={{ marginHorizontal: 20 }}
          inputContainerStyle={{ marginTop: 16 }}
          inputStyle={{ width: 150 }}
        />
        <EventTypeDropdown
          eventType={props.eventType}
          setEventType={props.setEventType}
        />
        <Button
          bordered
          style={AppConstants.defaultButtonStyle}
          onPress={() => evaluateEventNameType()}
        >
          <Text style={AppConstants.defaultButtonTextStyle}>Continue</Text>
        </Button>
      </Card>
    </View>
  );
};

export const CreateEventForm2 = (props) => {
  let [currentTag, setCurrentTag] = useState("");

  const textMiddle =
    "On this screen you can add a series of tags to help people search for events like yours. Add as many as you like. Each time you tap the next button on your keyboard a new tag is created. Tap Continue on your screen to move on.";

  const evaluateTags = () => {
    props.setEventTags([...props.eventTags, currentTag]);
    setCurrentTag("");
  };
  const handleDeleteTag = (tag) => {
    props.setEventTags(props.eventTags.filter((t) => t !== tag.tag));
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UniversalOverlay
        textMiddle={textMiddle}
        textTop="Event Tags"
        visible={props.visible}
        setVisible={props.setVisible}
      />
      <View
        style={{
          marginBottom: 50,
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.eventTags.map((tag) => (
          <Text
            key={tag}
            style={{
              margin: 15,
              padding: 5,
              color: Colors.defaultPrimary,
              fontSize: 16,
              backgroundColor: "#fff",
              //   borderColor: Colors.defaultPrimary,
              //   borderWidth: 2,
              borderRadius: 10,
              overflow: "hidden",
            }}
            onPress={() => handleDeleteTag({ tag })}
          >
            {tag}
          </Text>
        ))}
      </View>
      <Card style={styles.cardStyle}>
        <Input
          placeholder="Event Tag"
          label="Help people find your event"
          onChangeText={(text) => setCurrentTag(text)}
          keyboardType="default"
          enablesReturnKeyAutomatically={true}
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => evaluateTags()}
          value={currentTag}
          containerStyle={{ marginHorizontal: 20 }}
          inputContainerStyle={{ marginTop: 16 }}
          inputStyle={{ width: 150 }}
        />
        <View>
          <Button
            bordered
            style={AppConstants.defaultButtonStyle}
            onPress={() => props.setFormStep(3)}
          >
            <Text style={AppConstants.defaultButtonTextStyle}>Continue</Text>
          </Button>
          <Button
            bordered
            dark
            block
            style={AppConstants.defaultBackButtonStyle}
            onPress={() => props.setFormStep(1)}
          >
            <Text style={AppConstants.defaultBackButtonTextStyle}>Back</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
};

export const CreateEventForm3 = (props) => {
  const [mode, setMode] = useState("date");
  useEffect(() => {
    props.setTimeString(moment(props.date).format("hh:mm a"));
    props.setTime(props.date);
  }, []);

  const handleDateInput = (data) => {
    if (mode === "date") {
      let utc = moment(data).utc();
      props.setDateString(moment(data).utc().calendar());
      props.setDate(new Date(utc));
    } else if (mode === "time") {
      props.setTime(data);
      props.setTimeString(moment(data).format("hh:mm a"));
    }
  };
  const validateDateTimeInput = () => {
    if (props.time === null || props.time === undefined) {
      Alert.alert(
        "Wait a second.",
        "Please set a time for the event to start."
      );
    } else {
      props.setFormStep(4);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={styles.cardStyle}>
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={
              mode === "date" ? new Date(props.date) : new Date(props.time)
            }
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={(d) => {
              handleDateInput(d.nativeEvent.timestamp);
            }}
            style={{ border: "5px solid red", width: 400 }}
          />
        </View>

        <Text>
          Date: {mode === "date" ? props.dateString : props.timeString}{" "}
        </Text>
        <View>
          <Button
            bordered
            style={AppConstants.defaultButtonStyle}
            onPress={() => {
              mode === "date" ? setMode("time") : validateDateTimeInput();
            }}
          >
            {mode === "date" ? (
              <Text style={AppConstants.defaultButtonTextStyle}>Set Date</Text>
            ) : (
              <Text style={AppConstants.defaultButtonTextStyle}>Continue</Text>
            )}
          </Button>

          <Button
            bordered
            dark
            block
            style={AppConstants.defaultBackButtonStyle}
            onPress={() => {
              if (mode === "time") {
                setMode("date");
              } else if (mode === "date") {
                props.setFormStep(2);
              }
            }}
          >
            <Text style={AppConstants.defaultBackButtonTextStyle}>Back</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
};

export const CreateEventForm4 = (props) => {
  const [textRemaining, setTextRemaining] = useState(200);
  const [displayRemaining, setDisplayRemaining] = useState(false);
  const textMiddle =
    "Now's your chance to tell people a little more about your event.";
  const validateDescription = (data) => {
    let setRemainder = 199 - props.eventDescription.length;
    setTextRemaining(setRemainder);
    if (textRemaining < 50) {
      setDisplayRemaining(true);
    }
    props.setEventDescription(data);
  };
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UniversalOverlay
        textMiddle={textMiddle}
        textTop="Event Description"
        visible={props.visible}
        setVisible={props.setVisible}
      />

      <Card style={styles.cardStyle}>
        <TextInput
          placeholder="Event Description"
          label="Tell people a little more"
          onChangeText={(text) => validateDescription(text)}
          keyboardType="default"
          enablesReturnKeyAutomatically={true}
          autoCapitalize="words"
          autoCorrect={true}
          maxLength={200}
          multiline={true}
          numberOfLines={5}
          defaultValue={props.eventDescription}
          style={{
            padding: 8,
            borderColor: "#ccc",
            borderWidth: 1,
            width: "100%",
          }}
        />
        {displayRemaining && (
          <Text
            style={
              textRemaining < 20
                ? { color: Colors.danger }
                : { color: Colors.defaultPrimary }
            }
          >
            {textRemaining}
          </Text>
        )}
        <View>
          <Button
            bordered
            style={AppConstants.defaultButtonStyle}
            onPress={() => props.setFormStep(5)}
          >
            <Text style={AppConstants.defaultButtonTextStyle}>Continue</Text>
          </Button>
          <Button
            bordered
            dark
            block
            style={AppConstants.defaultBackButtonStyle}
            onPress={() => props.setFormStep(3)}
          >
            <Text style={AppConstants.defaultBackButtonTextStyle}>Back</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
};

export const CreateEventForm5 = (props) => {
  console.log(props);
  const user = useSelector((state) => state.user.user);
  const locationFromState = useSelector(
    (state) => state.user.user.organization.location
  );
  const {
    organization: {
      businessName,
      businessType,
      location: {
        business_address,
        business_city,
        business_state,
        business_zip,
        business_unit,
      },
    },
  } = user;
  const useDefault = () => {
    let LocationHolder = {};
    LocationHolder.city = locationFromState.business_city;
    LocationHolder.state = locationFromState.business_state;
    LocationHolder.zipCode = locationFromState.business_zip;
    LocationHolder.unit = locationFromState.business_unit;
    LocationHolder.streetAddress = locationFromState.business_address;
    props.setLocation(LocationHolder);
    props.HandleFinalSubmit();
    setTimeout(() => {
      props.navigation.navigate("By Neighborhood");
    }, 1500);
  };
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={styles.cardStyle}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Use This Location?
        </Text>
        <View style={AppConstants.defaultConfirmCard}>
          <Text style={AppConstants.defaultConfirmText}>{businessName}</Text>
        </View>
        <View style={AppConstants.defaultConfirmCard}>
          <Text style={AppConstants.defaultConfirmText}>
            {business_address}
          </Text>
        </View>
        <View style={(AppConstants.defaultConfirmCard, { marginBottom: 20 })}>
          <Text style={AppConstants.defaultConfirmText}>
            {business_city}, {business_state}
          </Text>
        </View>

        <View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Button
              bordered
              style={(AppConstants.defaultButtonStyle, { marginRight: 10 })}
              onPress={() => props.setFormStep(6)}
            >
              <Text style={AppConstants.defaultButtonTextStyle}>
                Set Another
              </Text>
            </Button>
            <Button
              bordered
              style={(AppConstants.defaultButtonStyle, { marginLeft: 10 })}
              onPress={() => useDefault()}
            >
              <Text style={AppConstants.defaultButtonTextStyle}>
                This works
              </Text>
            </Button>
          </View>
          <Button
            bordered
            dark
            block
            style={AppConstants.defaultBackButtonStyle}
            onPress={() => props.setFormStep(4)}
          >
            <Text style={AppConstants.defaultBackButtonTextStyle}>Back</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
};

export const CreateEventForm6 = (props) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UniversalOverlay
        textMiddle={textMiddle}
        textTop="Event Description"
        visible={props.visible}
        setVisible={props.setVisible}
      />

      <Card style={styles.cardStyle}>
        <View>
          <View>
            <Button
              bordered
              style={AppConstants.defaultButtonStyle}
              onPress={() => props.setFormStep(5)}
            >
              <Text style={AppConstants.defaultButtonTextStyle}>
                Use this one
              </Text>
            </Button>
            <Button
              bordered
              style={AppConstants.defaultButtonStyle}
              onPress={() => props.setFormStep(5)}
            >
              <Text style={AppConstants.defaultButtonTextStyle}>
                Set Another
              </Text>
            </Button>
          </View>
          <Button
            bordered
            dark
            block
            style={AppConstants.defaultBackButtonStyle}
            onPress={() => props.setFormStep(3)}
          >
            <Text style={AppConstants.defaultBackButtonTextStyle}>Back</Text>
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
