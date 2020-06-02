import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Picker, Icon } from "native-base";
import Colors from "../constants/Colors";
import AppConstants from "../constants/AppConstants";
import { StateArray } from "../models/StateArray";

const StateSelectDropdown = (props) => {
  return (
    <View>
      <Picker
        mode="dropdown"
        placeholder={props.businessState}
        iosIcon={<Icon name="arrow-down" />}
        textStyle={{ color: Colors.primaryColor }}
        itemStyle={{
          //   backgroundColor: "#d3d3d3",

          marginLeft: 0,
          paddingLeft: 10,
        }}
        itemTextStyle={{ color: Colors.primaryColor }}
        style={{ width: undefined }}
        selectedValue={() => console.log(this)}
        onValueChange={(value) => {
          props.setBusinessState(value);
        }}
      >
        {StateArray.map((state) => (
          <Picker.Item
            label={state.state}
            value={state.state}
            key={state.state}
          />
        ))}
      </Picker>
    </View>
  );
};

export default StateSelectDropdown;
