import React from "react";
import { View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const ViewEvents = (props) => {
  return (
    <View>
      <Text>View All Events Page here</Text>
    </View>
  );
};

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

export default ViewEvents;
