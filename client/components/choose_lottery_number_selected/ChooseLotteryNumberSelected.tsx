import { Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState, memo } from "react";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
interface props {
  number: number;
  onPress: (e: number) => boolean | void;
  numbers: number[];
}
const ChooseLotteryNumberSelected = ({ number, onPress, test }: props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const pressHandler = (number: number) => {
    const func = onPress(number);
    if (func) return setIsSelected(false);
    setIsSelected((prev) => !prev);
  };
  useEffect(() => {
    if (isSelected) setIsSelected(false);
  }, [test]);
  return (
    <Pressable onPress={pressHandler.bind(this, number)} style={styles.container}>
      <Animatable.Text
        delay={250}
        duration={400}
        transition={["color", "backgroundColor"]}
        style={[
          styles.number_container,
          {
            color: isSelected ? "white" : "black",
            backgroundColor: isSelected ? "rgb(21, 165, 241)" : "white",
            borderWidth: isSelected ? undefined : 0.7,
          },
        ]}
      >
        {number}
      </Animatable.Text>
    </Pressable>
  );
};

export default ChooseLotteryNumberSelected;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  number_container: {
    borderRadius: 20,
    textAlign: "center",
    padding: 5,

    width: 50,

    fontSize: 24,
  },
});
