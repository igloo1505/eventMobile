import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Picker, Icon } from "native-base";
import Colors from "../constants/Colors";
import AppConstants from "../constants/AppConstants";
import { useLinkProps } from "@react-navigation/native";

const BusinessTypePicker = (props) => {
  return (
    <View>
      <Picker
        mode="dropdown"
        placeholder={props.businessType}
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
          props.setDropDownText(value);
          props.setBusinessType(value);
        }}
      >
        {AppConstants.businessTypeArray.map((type) => (
          <Picker.Item label={type} value={type} key={type} />
        ))}
      </Picker>
    </View>
  );
};

export default BusinessTypePicker;
