import React from "react";
import NavButton from "./NavButton";
import HomeButton from "./HomeButton";
import { StyleSheet } from "react-native";
import { Header } from "react-native-elements";

const Navbar = () => {
  return (
    <Header
      leftComponent={<NavButton />}
      centerComponent={{
        text: "Event Driven MKE",
        style: { color: "#fff", fontSize: 18 },
      }}
      rightComponent={<HomeButton />}
    />
  );
};
const styles = StyleSheet.create({
  navbarStyle: {
    backgroundColor: "darkslateblue",
    height: 64,
    maxHeight: 64,
    width: "100%",
  },
  button: {
    backgroundColor: "darkslateblue",
  },
  icon: {
    color: "#fff",
  },
  header: {
    width: "100%",
    backgroundColor: "darkslateblue",
  },
});

export default Navbar;
