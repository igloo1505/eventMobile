import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
  YellowBox,
} from "react-native";
import { enableScreens } from "react-native-screens";
import { Spinner } from "native-base";
import { AppLoading } from "expo";
import AuthScreen from "./screens/AuthScreen";
import ViewEvents from "./screens/ViewEvents";
import { connect } from "react-redux";
import setAuthToken from "./setToken";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import OverLayLanding from "./components/OverLayLanding";
import { AuthenticatedNavOptions, LoginDrawer } from "./constants/AppConstants";
import Colors from "./constants/Colors";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import useCachedResources from "./hooks/useCachedResources";
import NavigationSwitcher from "./navigation/NavigationTree";

enableScreens();

const App = () => {
  // YellowBox.ignoreWarnings();
  console.disableYellowBox = true;
  if (AsyncStorage.token) {
    setAuthToken(AsyncStorage.getItem("token"));
  }
  return (
    <Provider store={store}>
      <NavigationSwitcher />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default App;
