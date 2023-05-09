import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GestureResponderEvent } from "react-native-modal";
import { Link } from "@react-navigation/native";
import { useDataProvider } from "../../context/Data";
interface props {
  children: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
}
const SquareBox = ({ children, onPress }: props) => {
  const { changeLanguage } = useDataProvider();
  return (
    <Pressable onPress={onPress}>
      <LinearGradient colors={["rgb(41, 185, 254)", "rgb(156, 220, 254)"]} style={styles.container}>
        <Text style={styles.text}>{changeLanguage(children)}</Text>
      </LinearGradient>
    </Pressable>
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
