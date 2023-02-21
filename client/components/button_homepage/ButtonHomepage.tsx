import { Pressable, StyleSheet, Text, View, GestureResponderEvent } from "react-native";
import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDataProvider } from "../../context/Data";
interface props {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}
const ButtonHomepage = ({ children, onPress }: props) => {
  const {changeLanguage} = useDataProvider()
  return (
    <Pressable onPress={onPress}>
      <LinearGradient style={styles.container} colors={["lightblue", "rgb(68, 138, 255)"]}>
        <Text style={styles.text}>{changeLanguage(children)}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default ButtonHomepage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

    height: 50,
    width: 180,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
