import React, { useState } from "react";
import { Button, Overlay } from "react-native-elements";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import Colors from "../constants/Colors";
import { StateArray } from "../models/StateArray";

let filteredData;
export const AutoCompleteState = (props) => {
  if (Platform.OS === "ios") {
    const returnData = StateArray.map((state) => state.state);
    let [data, setData] = useState(returnData);
    const handleFilterArray = (text) => {
      props.setUserLocalState(text);
      console.log(props.state);
      filteredData = data.filter(
        (dataState) => dataState.indexOf(props.state) !== -1
      );
      if (props.state !== "") {
        props.setVisible(false);
      }
      if (text === "" || filteredData.length === 0) {
        props.setVisible(true);
      }
      console.log(filteredData);
      console.log(props.visible);
    };

    const handleSelect = (item) => {
      props.setUserLocalState(item);
      console.log("user state selected...", props.state);
      props.setVisible(true);
    };
    return (
      <Autocomplete
        data={filteredData}
        defaultValue={"Wisconsin"}
        value={props.state}
        onChangeText={(text) => handleFilterArray(text)}
        hideResults={props.visible}
        listContainerStyle={styles.listContainerStyle}
        listStyle={styles.listStyle}
        renderItem={({ item, i }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            style={{ flex: 1 }}
          >
            <ScrollView>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  paddingVertical: 5,
                }}
              >
                {item}
              </Text>
            </ScrollView>
          </TouchableOpacity>
        )}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: Colors.light,
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 3,
  },
  listContainerStyle: {
    zIndex: 20,
    backgroundColor: Colors.light,
  },
  listStyle: { backgroundColor: Colors.light },
  title: {
    fontSize: 10,
  },
});
