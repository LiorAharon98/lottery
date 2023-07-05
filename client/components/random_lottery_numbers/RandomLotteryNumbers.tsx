import { StyleSheet, View } from "react-native";
import React from "react";
import { lotteryType, currentLottery } from "../../types/type";
import Number from "../number/Number";
interface props {
  arr: currentLottery;
}
const RandomLotteryNumbers = ({ arr }: props) => {
  return (
    <View style={styles.random_lottery_numbers_container}>
      <View style={styles.random_lottery_numbers_container2}>
        {arr?.lotteryNumbers?.map((number: lotteryType, index: number) => (
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
