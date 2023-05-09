import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDataProvider } from "../../context/Data";
import { lotteryType } from "../../types/type";
import Number from "../number/Number";

const RandomLotteryNumbers = () => {
  const { randomLotteryNumbers } = useDataProvider();
  return (
    <View style={styles.random_lottery_numbers_container}>
      <View style={styles.random_lottery_numbers_container2}>
        {randomLotteryNumbers?.lotteryNumbers?.map((number: lotteryType, index: number) => (
          <Number isSpecial={number.special} key={index}>
            {number.number}
          </Number>
        ))}
      </View>
    </View>
  );
};

export default RandomLotteryNumbers;

const styles = StyleSheet.create({
  random_lottery_numbers_container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 20,
    height: 130,
  },
  random_lottery_numbers_container2: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
