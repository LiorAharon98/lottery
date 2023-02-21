import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Number from "../../components/number/Number";
import { useDataProvider } from "../../context/Data";
import Button from "../../components/button/Button";
import ModalLottery from "../../components/modal_lottery/ModalLottery";
import UserLotteryNumbers from "../../components/user_lottery_numbers/UserLotteryNumbers";
import Timestamp from "../../components/timestamp/Timestamp";
const LotteryPage = () => {
  const { randomLotteryNumbers, compareNumbers, user, fetchLotteryNumbers, changeLanguage, userEarnedLottery } =
    useDataProvider();
  const [isWon, setIsWon] = useState<boolean>(false);
  const countGuessAndPrizes: { counter: number; prize: number }[] = useMemo(() => {
    let temp = [
      {
        counter: compareNumbers(user.lotteryNumbers[0][0]).cnt,
        prize: compareNumbers(user.lotteryNumbers[0][0]).prize,
      },
      {
        counter: compareNumbers(user.lotteryNumbers[0][1]).cnt,
        prize: compareNumbers(user.lotteryNumbers[0][1]).prize,
      },
    ];
    return temp;
  }, [randomLotteryNumbers]);
  useEffect(() => {
    fetchLotteryNumbers();
  }, []);
  useEffect(() => {
    if (countGuessAndPrizes[0].counter !== 0 || countGuessAndPrizes[1].counter !== 0) {
      setIsWon(true);
      userEarnedLottery(user.username, countGuessAndPrizes[0].prize + countGuessAndPrizes[1].prize);
    }
  }, [randomLotteryNumbers]);

  const onModalToggle = (value: boolean) => {
    setIsWon(value);
  };

  return (
    <ScrollView>
      <ModalLottery
        closeModal={onModalToggle.bind(this, false)}
        isWon={isWon}
        countGuessAndPrizes={countGuessAndPrizes}
      />
      <Timestamp />

      <Text style={styles.number}>{changeLanguage("winning numbers")}!</Text>
      <Text style={styles.number}>
        {changeLanguage("lottery date")} : {randomLotteryNumbers?.lotteryDate}
      </Text>
      <View style={styles.random_lottery_numbers_container}>
        {randomLotteryNumbers?.lotteryNumbers?.map((number: { number: number; special: boolean }, index: number) => (
          <Number isSpecial={number.special} key={index}>
            {number.number}
          </Number>
        ))}
      </View>
      <LinearGradient style={styles.main} colors={["lightblue", "rgb(68, 138, 255)"]}>
        <View style={styles.user_number_container}>
          <Text style={styles.number}>{changeLanguage("your numbers")}!</Text>
          <UserLotteryNumbers column={0} />

          <UserLotteryNumbers column={1} />
        </View>
        <View style={styles.button_container}>
          <Button width={170} onPress={onModalToggle.bind(this, true)}>
            {changeLanguage("compare")}
          </Button>
          <Button width={170} onPress={onModalToggle.bind(this, true)}>
            {changeLanguage("info")}
          </Button>
        </View>
        <View></View>
      </LinearGradient>
    </ScrollView>
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
    height: 500,
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
    height: 250,
    backgroundColor: "white",
    width: "100%",
  },
  number: {
    textAlign: "center",
    fontSize: 20,
  },
});
