import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import { Button, Overlay, Text } from "react-native-elements";

const OverLayLanding = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button title="Open Overlay" onPress={toggleOverlay} />

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        toggleOverlay={toggleOverlay}
      >
        <Text>Hello from Overlay!</Text>
      </Overlay>
    </View>
  );
};

export default OverLayLanding;
