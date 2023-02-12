import React, { ReactNode } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
interface props {
  children: ReactNode;
}
const Card = ({ children }: props) => {
  return (
    <ScrollView>
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["white", "white"]}
      >
        {children}
      </LinearGradient>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 730,
    justifyContent: "space-between",
    alignItems :'center'
  },
});
export default Card;
