import React from "react";
import Landing from "../screens/Landing";
import { View, Text, Button, SafeAreaView } from "react-native";
import { LOGOUT } from "../actions/Types";
import {
  loginDrawerContent,
  AuthenticatedDrawerContent,
  LoginDrawerContent,
} from "./AuthenticatedDrawerContent";
import { connect, useDispatch } from "react-redux";
import { logOut } from "../actions/userActions";
import ViewEvents from "../screens/ViewEvents";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import AuthScreen from "../screens/AuthScreen";
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import AboutScreen from "../screens/About";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import AppConstants, { DefaultNavOptions } from "../constants/AppConstants";
import StartUpScreen from "../screens/StartUpScreen";
import ByNeighborhood from "../screens/ByNeighborhood";
import ByIndividualNeighborhood from "../screens/ByIndividualNeighborhood";

const UnauthedStack = createStackNavigator();
const AuthedStack = createStackNavigator();

const UnauthedTree = (props) => {
  return (
    <UnauthedStack.Navigator>
      <UnauthedStack.Screen
        name="Login"
        component={AuthScreen}
        options={DefaultNavOptions}
      />
      <UnauthedStack.Screen
        name="About"
        component={AboutScreen}
        options={DefaultNavOptions}
      />
    </UnauthedStack.Navigator>
  );
};
export default UnauthedTree;

const NeighborhoodStack = createStackNavigator();
const ByNeighborhoodStack = (props) => {
  return (
    <NeighborhoodStack.Navigator>
      <NeighborhoodStack.Screen
        name="ByNeighborhood"
        component={ByNeighborhood}
        options={DefaultNavOptions}
      />
      <NeighborhoodStack.Screen
        name="ByNeighborhoodDetail"
        component={ByIndividualNeighborhood}
        options={{
          headerTitle: "Event Driven MKE",
          headerStyle: {
            backgroundColor: Colors.primaryColor,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          },
          headerTintColor: Colors.textColor,
        }}
      />
    </NeighborhoodStack.Navigator>
  );
};

const AboutStack = createStackNavigator();
const aboutStack = (props) => {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name="About"
        component={AboutScreen}
        options={DefaultNavOptions}
      />
    </AboutStack.Navigator>
  );
};

const AuthedTree = (props) => {
  return (
    <AuthedStack.Navigator screenOptions={DefaultNavOptions}>
      <AuthedStack.Screen name="Home" component={ViewEvents} />
      <AuthedStack.Screen
        name="By_Neighborhood"
        component={ByNeighborhoodStack}
      />
    </AuthedStack.Navigator>
  );
};

export const AuthedDrawer = () => {
  const dispatch = useDispatch();
  const AuthenticatedDrawer = createDrawerNavigator();
  return (
    <AuthenticatedDrawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="logout"
                color={Colors.primaryColor}
                onPress={() => dispatch({ type: LOGOUT })}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{ activeTintColor: Colors.primaryColor }}
    >
      <AuthenticatedDrawer.Screen
        name="View All"
        component={AuthedTree}
        options={{
          drawerIcon: (props) => {
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={Colors.primaryColor}
            />;
          },
        }}
      />
      <AuthenticatedDrawer.Screen
        name="By Neighborhood"
        component={ByNeighborhoodStack}
        options={DefaultNavOptions}
      />
      <AuthenticatedDrawer.Screen
        name="About"
        component={aboutStack}
        options={DefaultNavOptions}
      />
    </AuthenticatedDrawer.Navigator>
  );
};

// TODO exchange this single component for a stack if a multistep form is needed
export const LoginDrawer = () => {
  const NewDrawer = createDrawerNavigator();
  return (
    <NewDrawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{ activeTintColor: Colors.primaryColor }}
    >
      <NewDrawer.Screen
        name="Login"
        component={UnauthedTree}
        // options={DefaultNavOptions}
      />
      <NewDrawer.Screen
        name="About!!!"
        component={aboutStack}
        // options={DefaultNavOptions}
      />
    </NewDrawer.Navigator>
  );
};

export const NavigationSwitcher = (props) => {
  const isAuthenticated = useSelector((state) => state.user.loggedIn);
  const triedAutoLogin = useSelector((state) => state.user.triedAutoLogin);
  console.log("isAuthenticated \r\n", isAuthenticated);
  console.log("autoLogin \r\n", triedAutoLogin);
  return (
    <NavigationContainer>
      {isAuthenticated && <AuthedDrawer />}
      {!isAuthenticated && triedAutoLogin && <AuthedDrawer />}
      {!isAuthenticated && !triedAutoLogin && <LoginDrawer />}
    </NavigationContainer>
  );
};
