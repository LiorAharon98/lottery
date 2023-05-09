import { Pressable, StyleSheet, Text, View, GestureResponderEvent } from "react-native";
import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDataProvider } from "../../context/Data";
import { props } from "../../types/type";
const Button = ({ children, onPress, width }: props) => {
  const { changeLanguage } = useDataProvider();
  return (
    <Pressable onPress={onPress}>
      <LinearGradient style={[styles.container, { width: width ? width : 220 }]} colors={["white", "white"]}>
        <Text style={styles.text}>{changeLanguage(children)}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

    height: 50,
    width: 220,
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    color: "rgb(21, 165, 241)",
  },
});
