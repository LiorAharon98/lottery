import { StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";

interface props {
  number: number;
  onPress: (e: number) => void;
  toggle: { number: number; special: boolean };
}
const ChooseLotterySpecialNumber = ({ number, onPress, toggle }: props) => {
  const handlePress = () => {
    onPress(number);
  };

  return (
    <Pressable
      onPress={handlePress.bind(this, number)}
      style={toggle.number === number ? styles.number_container_selected : styles.number_container_unselected}
    >
      <Animatable.Text
        transition={"color"}
        duration={500}
        style={[styles.number, { color: toggle.number === number ? "white" : "black" }]}
      >
        {number}
      </Animatable.Text>
    </Pressable>
  );
};

export default ChooseLotterySpecialNumber;

const styles = StyleSheet.create({
  number_container_selected: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(21, 165, 241)",
    borderRadius: 20,
    height: 50,
    width: 50,
    margin: 4,
  },
  number_container_unselected: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    margin: 4,
    borderRadius: 20,
    borderWidth: 0.7,
  },
  number: {
    color: "white",

    fontSize: 24,
  },
});
