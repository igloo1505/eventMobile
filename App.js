import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from "react-native";
import { enableScreens } from "react-native-screens";
import setAuthToken from "./setToken";
import { Provider } from "react-redux";
import store from "./store";
import OverLayLanding from "./components/OverLayLanding";
import EventUserNavigator from "./navigation/EventNavigation";
import useCachedResources from "./hooks/useCachedResources";

enableScreens();

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
        <EventUserNavigator />
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
