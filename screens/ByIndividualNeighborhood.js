import React, { useEffect, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { SET_EVENT_LOADING } from "../actions/Types";
import NoneToDisplay from "../components/NoneToDisplay";
import { useFocusEffect } from "@react-navigation/native";
import { connect, useSelector, useDispatch } from "react-redux";
import { setLoading } from "../actions/userActions";
import { getByNeighborhood, resetEventState } from "../actions/eventActions";
import { Spinner } from "native-base";

const ByIndividualNeighborhood = ({
  navigation,
  route: { params },
  events,
  props,
  getByNeighborhood,
  setLoading,
  eventLoading,
  resetEventState,
}) => {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: SET_EVENT_LOADING,
        payload: false,
      });
    }, [])
  );

  // useEffect(() => {

  // }, [event])

  const { categoryTitle, headerStyle } = params;
  navigation.setOptions(headerStyle);

  // const hasData = useSelector((state) => state.event.neighborhoodHasData);

  const hasData = false;

  let mainText =
    "I'm sorry. We can't find any events for this neighborhood right now. If you think this might be an error or you would like to add another neighborhood please message us through the link in the about tab.";
  return (
    <View style={styles.container}>
      {hasData ? <Text>List here</Text> : <NoneToDisplay mainText={mainText} />}
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
  props: ownProps,
});

export default connect(mapStateToProps, {
  getByNeighborhood,
  setLoading,
  resetEventState,
})(ByIndividualNeighborhood);
