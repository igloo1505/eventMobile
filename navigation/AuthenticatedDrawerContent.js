import React from "react";
import { View, Button, SafeAreaView } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
export const AuthenticatedDrawerContent = (props) => {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <DrawerItemList {...props} />
        <Button
          title="logout"
          color={Colors.primaryColor}
          onPress={() => console.log("Add logout Function here")}
        />
      </SafeAreaView>
    </View>
  );
};

export const LoginDrawerContent = (props) => {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </View>
  );
};
