/* es-lint-disable */
import React from "react";
import HeaderButtonComponent from "../navigation/HeaderButtonComponent";
import NavigationTree from "../navigation/NavigationTree";
import About from "../screens/About";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import Colors from "./Colors";

export default {
  serverRoot: "https://c5c8587d9d64.ngrok.io",
  drawerOptions: {
    drawerIcon: (props) => {
      <Ionicons
        name={Platform.OS === "android" ? "md-create" : "ios-create"}
        size={23}
        color={Colors.primaryColor}
      />;
    },
  },
};

export const DefaultNavOptions = (navData) => {
  return {
    headerTitle: "Event Driven MKE",
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    },
    headerLeft: () => <HeaderButtonComponent />,
    headerTintColor:
      Platform.OS === "android" ? Colors.textColor : Colors.primaryColor,
  };
};
