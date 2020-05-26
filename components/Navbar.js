import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Left,
  Icon,
  Button,
  Text,
} from "native-base";

const Navbar = () => {
  return (
    <Container style={styles.navbarStyle}>
      <Header style={styles.header}>
        <Left>
          <Button style={styles.button}>
            <Icon name="menu" style={styles.icon} />
          </Button>
        </Left>
      </Header>
    </Container>
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
