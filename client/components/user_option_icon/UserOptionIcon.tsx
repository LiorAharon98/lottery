import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { GestureResponderEvent } from "react-native-modal";
import { useDataProvider } from "../../context/Data";

interface props {
  children: React.ReactNode;
  text: string;
  onPress: (e: GestureResponderEvent) => void;
  height?: number;
  width?: number;
}
const UserOptionIcon = ({ children, text, onPress, height, width }: props) => {
  const { changeLanguage } = useDataProvider();
  return (
    <Pressable onPress={onPress} style={[styles.container, { height: height ? height : 100, width: width ? width : 100 }]}>
      {children}
      <Text style={styles.text}>{changeLanguage(text)}</Text>
    </Pressable>
  );
};

export default UserOptionIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
    width: 100,
  },

  text: {
    fontSize: 17,
  },
});
