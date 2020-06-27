import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Spinner } from "native-base";
import Colors from "../constants/Colors";

const NoneToDisplay = ({ eventLoading, userLoading, hasEventData, props }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log("event:", eventLoading);
    console.log("user:", userLoading);
    console.log("hasEventData:", hasEventData);
    if (!eventLoading && hasEventData) {
      console.log("setting showlist to", true);
      props.setShowList(true);
    }
    if (!eventLoading && hasEventData !== null && !hasEventData) {
      console.log("setting eventloading to", eventLoading);
      setIsLoading(eventLoading);
    }
    if (!eventLoading && !userLoading && hasEventData === null) {
      setIsLoading(false);
    }
  }, [eventLoading, hasEventData]);
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Spinner color={Colors.primaryColor} />
        </View>
      ) : (
        <View style={styles.ViewStyle}>
          <Text style={styles.textStyle}>{props.mainText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    marginTop: 100,
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 50,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  textStyle: {
    color: "#000",
    padding: 30,
    fontSize: 18,
  },
});
const mapStateToProps = (state, ownProps) => ({
  eventLoading: state.event.loading,
  userLoading: state.user.loading,
  hasEventData: state.event.neighborhoodHasData,
  props: ownProps,
});

export default connect(mapStateToProps)(NoneToDisplay);
