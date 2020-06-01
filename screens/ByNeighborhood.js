import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import GridTile from "../components/GridTile";
import { StackActions } from "@react-navigation/native";
import Neighborhood from "../models/NeighborhoodGridModel";
import { useNavigation } from "@react-navigation/native";
import AppConstants from "../constants/AppConstants";
import { TouchableOpacity } from "react-native-gesture-handler";

const ByNeighborhood = ({ navigation }) => {
  console.log(navigation);

  const renderGridItem = (itemData) => {
    return (
      <GridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() =>
          navigation.navigate({
            name: "ByNeighborhoodDetail",
            params: {
              categoryTitle: itemData.item.title,
            },
          })
        }
      />
    );
  };
  return (
    <ScrollView>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={AppConstants.neighborhoodArray}
        numColumns={2}
        renderItem={renderGridItem}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  gridItemStyle: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default ByNeighborhood;
