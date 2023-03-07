import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface props {
  numbers: number[];
  onSelectNumbers: (number: number) => void;
  selectedNumbers?: { number: number }[];
  selectSpecialNumbers?: { number: number };
}
const ChooseLotteryNumber = ({ numbers, onSelectNumbers, selectedNumbers, selectSpecialNumbers }: props) => {
  return (
    <View style={styles.container}>
      {numbers.map((number, index) => {
        return (
          <Text
            key={index}
            style={
              selectedNumbers
                ? selectedNumbers.filter((currentNumber) => currentNumber.number === number).length > 0
                  ? styles.selected_number
                  : styles.un_selected_number
                : selectSpecialNumbers?.number === number
                ? styles.selected_number
                : styles.un_selected_number
            }
            onPress={onSelectNumbers.bind(this, number)}
          >
            {number}
          </Text>
        );
      })}
    </View>
  );
};

export default ChooseLotteryNumber;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: 10,
  },
  un_selected_number: {
    textAlign: "center",
    fontSize: 24,
    margin: 6,
    paddingTop: 4,
    borderWidth: 1,
    borderRadius: 20,
    height: 44,
    width: 47,
  },
  selected_number: {
    textAlign: "center",
    backgroundColor: "rgb(21, 165, 241)",
    fontSize: 24,
    paddingTop: 4,
    margin: 6,
    borderWidth: 0,
    color: "white",
    borderRadius: 20,
    height: 44,
    width: 47,
  },
});
