import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { GestureResponderEvent } from "react-native-modal";
import { useDataProvider } from "../../context/Data";

interface props {
  children: React.ReactNode;
  backgroundColor: string;
  text: string;
  onPress: (e: GestureResponderEvent) => void;
  height?: number;
  width?: number;
}
const UserOptionIcon = ({ children, text, onPress, height, width, backgroundColor }: props) => {
  const { changeLanguage } = useDataProvider();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { height: height ? height : 100, width: width ? width : 150, backgroundColor: backgroundColor },
      ]}
    >
      {children}
      <Text style={styles.text}>{changeLanguage(text)}</Text>
    </Pressable>
  );
};

export default UserOptionIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    borderRadius: 20,
    margin: 15,
    alignItems: "center",
    height: 150,
    width: 150,
  },

  text: {
    fontSize: 17,
    color: "white",
  },
});
