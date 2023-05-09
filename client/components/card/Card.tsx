import React, { ReactNode } from "react";
import { StyleSheet, ScrollView, View, Dimensions } from "react-native";
import { card } from "../../types/type";

const Card = ({ children, height }: card) => {
  return (
    <ScrollView>
      <View style={[styles.container, { height: height ? Dimensions.get("window").height * 0.86 : "100%" }]}>
        {children}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default Card;
