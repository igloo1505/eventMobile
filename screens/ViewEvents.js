import React, { useEffect, useCallback, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { connect, useSelector, useDispatch } from "react-redux";
import { SET_EVENT_LOADING, RESET_EVENT_ARRAY } from "../actions/Types";
import NoneToDisplay from "../components/NoneToDisplay";
import DisplayEventsListItem from "../components/displayEvents/DisplayEventsListItem";
import { setLoading } from "../actions/userActions";
import {
  getByNeighborhood,
  resetEventState,
  getAllEvents,
} from "../actions/eventActions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const ViewEvents = ({
  navigation,
  route: { params },
  events,
  props,
  getByNeighborhood,
  hasEventData,
  getAllEvents,
  eventArray,
  setLoading,
  eventLoading,
  resetEventState,
}) => {
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getAllEvents();
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: SET_EVENT_LOADING,
        payload: false,
      });
      return () => dispatch({ type: RESET_EVENT_ARRAY });
    }, [])
  );
  let mainText = "Add clever none found message here";
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

ViewEvents.navigationOptions = (navData) => {
  return {
    headerTitle: "All Local Events",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const mapStateToProps = (state, ownProps) => ({
  events: state.event,
  eventLoading: state.event.loading,
  hasEventData: state.event.neighborhoodHasData,
  eventArray: state.event.returnedEvents,
  props: ownProps,
});

export default connect(mapStateToProps, {
  getByNeighborhood,
  getAllEvents,
  setLoading,
  resetEventState,
})(ViewEvents);
