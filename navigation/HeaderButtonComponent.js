import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
const HeaderButtonComponent = () => {
  const navigation = useNavigation();
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="menu"
        iconName="ios-menu"
        onPress={() => {
          // console.log(navData.navigation.navigate);
          // navData.navigation.toggleDrawer();
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}
      />
    </HeaderButtons>
  );
};

export default HeaderButtonComponent;
