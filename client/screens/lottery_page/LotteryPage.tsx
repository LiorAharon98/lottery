import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Number from "../../components/number/Number";
import { useDataProvider } from "../../context/Data";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";

const LotteryPage = () => {
  const { randomLotteryNumbers, compareNumbers, user, fetchLotteryNumbers } = useDataProvider();

  let counter = compareNumbers(user.lotteryNumbers[0]).cnt;
  let prize = compareNumbers(user.lotteryNumbers[0]).prize;

  useEffect(() => {
    fetchLotteryNumbers();
  }, []);

  const handlePress = () => {};
  return (
    <View>
      <Modal counter={counter} guessNumber={prize} />
      <Text style={styles.number}>winning numbers!</Text>
      <Text style={styles.number}>lottery date : {randomLotteryNumbers?.lotteryDate}</Text>
      <View style={styles.random_lottery_numbers_container}>
        {randomLotteryNumbers?.lotteryNumbers?.map((number: { number: number; special: boolean }, index: number) => (
          <Number isSpecial={number.special} key={index}>
            {number.number}
          </Number>
        ))}
      </View>
      <LinearGradient style={styles.main} colors={["lightblue", "rgb(68, 138, 255)"]}>
        <View style={styles.user_number_container}>
          <Text style={styles.number}>your numbers!</Text>
          <View style={styles.user_number}>
            {user.lotteryNumbers[0].map((number: { number: number; special: boolean }, index: number) => {
              return (
                <Number isSpecial={number.special} key={index}>
                  {number.number}
                </Number>
              );
            })}
          </View>
        </View>
        <View style={styles.button_container}>
          <Button onPress={handlePress}>compare</Button>
          <Button onPress={handlePress}>info</Button>
        </View>
        <View></View>
      </LinearGradient>
    </View>
  );
};

export default LotteryPage;

const styles = StyleSheet.create({
  random_lottery_numbers_container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 20,
    height: 120,
  },
  main: {
    height: 650,
    alignItems: "center",
    justifyContent: "space-around",
  },
  button_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  user_number_container: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-around",
    height: 150,
    backgroundColor: "white",
    width: "100%",
  },
  number: {
    textAlign: "center",
    fontSize: 20,
  },
  user_number: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
  },
});
