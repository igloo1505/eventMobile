import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "native-base";

const GridTile = (props) => {
  console.log(props);
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.gridItemStyle}>
      <View
        style={{ ...styles.gridContainer, ...{ backgroundColor: props.color } }}
      >
        <Text style={styles.titleStyle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItemStyle: {
    flex: 1,
    margin: 15,
    height: 150,
  },
  gridContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  titleStyle: {
    fontSize: 22,
    textAlign: "right",
  },
});

export default GridTile;
