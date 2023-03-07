import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
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
        activateModal={isWon}
        countGuessAndPrizes={countGuessAndPrizes}
      />

      <View style={styles.main}>
        <Timestamp />

        <Text style={styles.number}>
          {changeLanguage("lottery date")} : {randomLotteryNumbers?.lotteryDate}
        </Text>
        <View style={styles.random_lottery_numbers_container}>
          <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-around" }}>
            {randomLotteryNumbers?.lotteryNumbers?.map(
              (number: { number: number; special: boolean }, index: number) => (
                <Number isSpecial={number.special} key={index}>
                  {number.number}
                </Number>
              )
            )}
          </View>
        </View>
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
      </View>
    </ScrollView>
  );
};

export default LotteryPage;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  random_lottery_numbers_container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 20,
    height: 140,
  },
  button_container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  user_number_container: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-around",
    height: 300,
    backgroundColor: "white",
    width: "100%",
  },
  number: {
    textAlign: "center",
    fontSize: 20,
  },
});
