import React from "react";
import Landing from "../screens/Landing";
import ViewEvents from "../screens/ViewEvents";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
import AuthScreen from "../screens/AuthScreen";
import AppConstants from "../constants/AppConstants";
import {
  AuthenticatedNavOptions,
  LoginDrawer,
} from "../constants/AppConstants";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const AuthenticatedStack = createStackNavigator();

const AuthenticatedNavigator = () => {
  return (
    <AuthenticatedStack.Navigator>
      <AuthenticatedStack.Screen
        name="ViewAll"
        component={ViewEvents}
        options={AuthenticatedNavOptions}
      />
    </AuthenticatedStack.Navigator>
  );
};

const defaultNavigationOptions = (navData) => {
  return {
    headerTitle: "Event Driven MKE",
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    },
    headerLeft: () => (
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
    headerTintColor:
      Platform.OS === "android" ? Colors.textColor : Colors.primaryColor,
  };
};

export default AuthenticatedNavigator;
