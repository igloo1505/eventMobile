import React from "react";
import { View, StyleSheet } from "react-native";
import { Overlay, Text } from "react-native-elements";
import { Button } from "native-base";
import Card from "./UI/Card";
import Colors from "../constants/Colors";

const AdminSwitchOverlay = (props) => {
  const toggleOverlay = () => {
    props.setVisible(!props.visible);
  };
  return (
    <View style={styles.viewStyle}>
      <Card>
        <Overlay
          isVisible={props.visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overLayContainer}
        >
          <View>
            <View
              style={{
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                marginBottom: 5,
              }}
            >
              <Text style={styles.titleText}>
                You're registering a business?!?!
              </Text>
            </View>
            <Text style={styles.bodyText}>
              That's great news. We just need to collect some information so we
              can pass on your events to people near by.
            </Text>
            <Button
              bordered
              primary
              onPress={() => toggleOverlay()}
              style={{
                marginVertical: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 14,
                  textAlign: "center",
                  color: Colors.defaultPrimary,
                }}
              >
                Continue
              </Text>
            </Button>
          </View>
        </Overlay>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  overLayContainer: {
    width: "80%",
    marginHorizontal: 100,
    marginVertical: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    paddingVertical: 8,
    textAlign: "center",
  },
  bodyText: {
    fontSize: 16,
    paddingVertical: 8,
    textAlign: "center",
  },
});

export default AdminSwitchOverlay;
