import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from "react-native";
import setAuthToken from "./setToken";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import OverLayLanding from "./components/OverLayLanding";

import useCachedResources from "./hooks/useCachedResources";

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  if (AsyncStorage.token) {
    setAuthToken(AsyncStorage.token);
  }
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Navbar />
          <OverLayLanding />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
