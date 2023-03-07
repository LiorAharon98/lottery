import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GestureResponderEvent } from "react-native-modal";
import { Link } from "@react-navigation/native";
interface props {
  children: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  to?: string;
}
const SquareBox = ({ children, to, onPress }: props) => {
  return (
    <Link onPressIn={onPress} to={to ? to : "home"}>
      <LinearGradient colors={["rgb(41, 185, 254)", "rgb(156, 220, 254)"]} style={styles.container}>
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>
    </Link>
  );
};

export default SquareBox;

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  text: {
    color: "white",
    fontSize: 18,
  },
});
