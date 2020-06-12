import React, { useEffect, useCallback, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { SET_EVENT_LOADING } from "../actions/Types";
import NoneToDisplay from "../components/NoneToDisplay";
import { useFocusEffect } from "@react-navigation/native";
import { connect, useSelector, useDispatch } from "react-redux";
import { setLoading } from "../actions/userActions";
import { getByNeighborhood, resetEventState } from "../actions/eventActions";
import { Spinner } from "native-base";
import DisplayEventsListItem from "../components/displayEvents/DisplayEventsListItem";

const ByIndividualNeighborhood = ({
  navigation,
  route: { params },
  events,
  props,
  getByNeighborhood,
  hasEventData,
  eventArray,
  setLoading,
  eventLoading,
  resetEventState,
}) => {
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);
  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: SET_EVENT_LOADING,
        payload: false,
      });
    }, [])
  );

  const { categoryTitle, headerStyle } = params;
  navigation.setOptions(headerStyle);
  let mainText =
    "I'm sorry. We can't find any events for this neighborhood right now. If you think this might be an error or you would like to add another neighborhood please message us through the link in the about tab.";

  return (
    <View style={styles.container}>
      {showList &&
        eventArray.length !== 0 &&
        eventArray.map((event) => <DisplayEventsListItem event={event} />)}
      {!showList && (
        <NoneToDisplay mainText={mainText} setShowList={setShowList} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignContent: "center",
  },
});
const mapStateToProps = (state, ownProps) => ({
  events: state.event,
  eventLoading: state.event.loading,
  hasEventData: state.event.neighborhoodHasData,
  eventArray: state.event.filteredByNeighborhood,
  props: ownProps,
});

export default connect(mapStateToProps, {
  getByNeighborhood,
  setLoading,
  resetEventState,
})(ByIndividualNeighborhood);
