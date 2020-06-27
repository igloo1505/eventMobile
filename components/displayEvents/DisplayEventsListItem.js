import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import TouchableScale from "react-native-touchable-scale";
import LinearGradient from "react-native-linear-gradient";
import { getDateDifference } from "../../actions/eventActions";
import { ListItem } from "react-native-elements";

const DisplayEventsListItem = (props) => {
  const [eventIn, setEventIn] = useState("0");
  setTimeout(() => {
    setEventIn(getDateDifference(props.event.eventDateTime.UTC));
  }, 1000);

  return (
    <View>
      <ListItem
        Component={TouchableScale}
        key={props.event._id}
        friction={90}
        tension={100}
        activeScale={0.95}
        //   leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
        title={props.event.eventName}
        rightTitle={eventIn}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        subtitle={props.event.eventLocation.location.formattedAddress}
        subtitleStyle={{ color: "black", marginTop: 5 }}
        chevron={{ color: "#ccc" }}
        bottomDivider
      />
    </View>
  );
};

export default DisplayEventsListItem;
