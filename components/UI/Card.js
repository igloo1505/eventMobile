import React from "react";
import { View, StyleSheet } from "react-native";
import AppConstants from "../../constants/AppConstants";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: AppConstants.defaultCardStyle,
});

export default Card;
