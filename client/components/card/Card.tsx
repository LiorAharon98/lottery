import React, { ReactNode } from "react";
import {StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
interface props {
  children: ReactNode;
  height? : number
}
const Card = ({ children,height }: props) => {
  return (
    <ScrollView>
      <LinearGradient
        style={[styles.container,{height : height ? height : 720}]}
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
    height: 720,
    justifyContent: "space-between",
    alignItems :'center'
  },
});
export default Card;
