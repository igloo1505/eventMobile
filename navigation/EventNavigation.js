import { createStackNavigator } from "react-navigation-stack";
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
} from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import Landing from "../screens/Landing";
import ViewEvents from "../screens/ViewEvents";
import Colors from "../constants/Colors";
import AuthScreen from "../screens/AuthScreen";

// NOTEWORTHY first key is to be used as reference and can be string value at this point, second value is the default export for each screen imported above
const EventUserNavigator = createStackNavigator(
  {
    Login: Landing,
    ViewEvents: ViewEvents,
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Event Driven MKE",
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
      },
      headerTintColor:
        Platform.OS === "android" ? Colors.textColor : Colors.primaryColor,
    },
  }
);
const mainNavigator = createDrawerNavigator({
  viewAll: EventUserNavigator,
});

const AuthNavigator = createStackNavigator({
  auth: AuthScreen,
});

const MainNavigator = createSwitchNavigator({
  auth: AuthNavigator,
  main: mainNavigator,
});

// NOTEWORTHY createAppContainer must be used to export default stack, exporting it alone will cause endless bugs
// export default createAppContainer(EventUserNavigator);

export default createAppContainer(MainNavigator);
