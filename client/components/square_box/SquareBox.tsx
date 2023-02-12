import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GestureResponderEvent } from "react-native-modal";
import { Link } from "@react-navigation/native";
interface props {
  children: ReactNode;
  onPress?:  (e : GestureResponderEvent)=>void
  to: string ;

}
const SquareBox = ({ children, to,onPress }: props) => {
  return (
    <Link onPressIn={onPress} to={to}>
      <LinearGradient colors={["lightblue", "rgb(68, 138, 255)"]} style={styles.container}>
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>
    </Link>
  );
};

export default SquareBox;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    height: 110,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  text: {
    color: "white",
    fontSize: 18,
  },
});
