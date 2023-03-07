import React, { ReactNode } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
interface props {
  children: ReactNode;
  height?: number;
}
const Card = ({ children, height }: props) => {
  return (
    <ScrollView>
      <View style={[styles.container, { height: height ? height : 700 }]}>{children}</View>
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
