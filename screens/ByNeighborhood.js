import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import GridTile from "../components/GridTile";
import Colors from "../constants/Colors";
import { connect, useDispatch } from "react-redux";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import Neighborhood from "../models/NeighborhoodGridModel";
import { resetEventState, getByNeighborhood } from "../actions/eventActions";
import { SET_EVENT_LOADING } from "../actions/Types";
import { useNavigation } from "@react-navigation/native";
import AppConstants from "../constants/AppConstants";
import { TouchableOpacity } from "react-native-gesture-handler";

const ByNeighborhood = ({
  navigation,
  props,
  resetEventState,
  getByNeighborhood,
}) => {
  const handleSelect = (ItemData) => {};
  const dispatch = useDispatch();
  useFocusEffect(() => {
    resetEventState();
  }, []);
  const redirectAndLoad = (itemData) => {
    navigation.navigate("ByNeighborhoodDetail", {
      categoryTitle: itemData.item.title,
      headerStyle: {
        headerTitle: itemData.item.title,
        headerStyle: {
          // backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
          backgroundColor: Colors.primaryColor,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        },
        headerTintColor: Colors.textColor,
      },
    });
    dispatch({
      type: SET_EVENT_LOADING,
      payload: true,
    });
    getByNeighborhood(itemData.item.title);
  };

  const renderGridItem = (itemData) => {
    return (
      <GridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => redirectAndLoad(itemData)}
      />
    );
  };
  return (
    <ScrollView>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={AppConstants.neighborhoodArray}
        numColumns={2}
        renderItem={renderGridItem}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  gridItemStyle: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  props: ownProps,
});

export default connect(mapStateToProps, { resetEventState, getByNeighborhood })(
  ByNeighborhood
);
