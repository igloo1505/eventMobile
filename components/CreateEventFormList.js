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
import EventTypeDropdown from "./EventTypeDropdown";
import { Button } from "native-base";
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
    console.log(tag);
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
          width: "80%",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
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
              backgroundRadius: 10,
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
            onPress={() => console.log("submit form logic here")}
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
