import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
interface props {
  number: number;
  onPress: (e: number) => void;
  numbers: number[];
  toggleModal: boolean;
}
const ChooseLotteryNumberSelected = ({ number, onPress, numbers, toggleModal }: props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const pressHandler = (number: number) => {
    const func = onPress(number);
    if (func) return setIsSelected(false);
    setIsSelected((prev) => !prev);
  };
  useEffect(() => {
    setIsSelected(false);
  }, [toggleModal]);

  return (
    <Pressable onPress={pressHandler.bind(this, number)} style={isSelected ? styles.number_container_selected : styles.number_container_unselected}>
      <Animatable.Text
        duration={500}
        transition={"color"}
        style={[styles.number, { color: isSelected ? "white" : "black" }]}
      >
        {number}
      </Animatable.Text>
    </Pressable>
  );
};

export default ChooseLotteryNumberSelected;

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
