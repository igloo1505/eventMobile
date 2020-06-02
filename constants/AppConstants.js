/* es-lint-disable */
import React from "react";
import HeaderButtonComponent from "../navigation/HeaderButtonComponent";
import Neighborhood from "../models/NeighborhoodGridModel";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import Colors from "./Colors";

export default {
  serverRoot: "https://15ff5cf31176.ngrok.io",
  drawerOptions: {
    drawerIcon: (props) => {
      <Ionicons
        name={Platform.OS === "android" ? "md-create" : "ios-create"}
        size={23}
        color={Colors.primaryColor}
      />;
    },
  },
  neighborhoodArray: [
    new Neighborhood("1", "RiverWest", "#f5428d"),
    new Neighborhood("2", "Brady Street", "#f54242"),
    new Neighborhood("3", "Third Ward", "#f5a442"),
    new Neighborhood("4", "Brewers Hill", "#f5d142"),
    new Neighborhood("5", "Water Street", "#368dff"),
    new Neighborhood("6", "Upper East Side", "#41d95d"),
    new Neighborhood("7", "Walkers Point", "#9eecff"),
    new Neighborhood("8", "West Side", "#b9ffb0"),
    new Neighborhood("9", "South Side", "#ffc7ff"),
    new Neighborhood("10", "North Side", "#47fced"),
  ],
  defaultCardStyle: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
};

export const DefaultNavOptions = (navData) => {
  return {
    headerTitle: "Event Driven MKE",
    headerStyle: {
      // backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
      backgroundColor: Colors.primaryColor,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    headerLeft: () => <HeaderButtonComponent />,
    // headerTintColor:
    //   Platform.OS === "android" ? Colors.textColor : Colors.primaryColor,
    headerTintColor: Colors.textColor,
  };
};
