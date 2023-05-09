import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import RandomLotteryNumbers from "../random_lottery_numbers/RandomLotteryNumbers";
import { useDataProvider } from "../../context/Data";
import Button from "../button/Button";
import ModalLottery from "../modal_lottery/ModalLottery";
import UserLotteryNumbers from "../user_lottery_numbers/UserLotteryNumbers";
import Timestamp from "../timestamp/Timestamp";
import ModalInfo from "../modal_info/ModalInfo";
interface columnType {
  cnt: number;
  prize: number;
  special: boolean;
}

const LotteryPageComponent = () => {
  const { randomLotteryNumbers, compareNumbers, user, fetchLotteryNumbers, changeLanguage, userEarnedLottery } =
    useDataProvider();

  const [isWon, setIsWon] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<boolean>(false);

  const countGuessAndPrizes: { firstColumn: columnType; secondColumn: columnType } = useMemo(() => {
    let temp = {
      firstColumn: compareNumbers(user.lotteryNumbers.firstColumn, randomLotteryNumbers),

      secondColumn: compareNumbers(user.lotteryNumbers.secondColumn, randomLotteryNumbers),
    };

    return temp;
  }, [randomLotteryNumbers]);
  useEffect(() => {
    fetchLotteryNumbers();
    if (countGuessAndPrizes.firstColumn.cnt || countGuessAndPrizes.secondColumn.cnt) {
    
      userEarnedLottery(user.username, countGuessAndPrizes.firstColumn.prize + countGuessAndPrizes.secondColumn.prize);
    }
  }, []);
  useEffect(() => {
    if (countGuessAndPrizes.firstColumn.cnt || countGuessAndPrizes.secondColumn.cnt) {
      setIsWon(true);
    }
  }, [randomLotteryNumbers]);

  const onModalToggle = (value: boolean) => {
    setIsWon(value);
  };
  const onInfoModalToggle = (value: boolean) => {
    setModalInfo(value);
  };

  return (
    <ScrollView>
      <ModalLottery
        closeModal={onModalToggle.bind(this, false)}
        activateModal={isWon}
        countGuessAndPrizes={countGuessAndPrizes}
      />
      <ModalInfo
        closeModal={onInfoModalToggle.bind(this, false)}
        info="lottery-info"
        toggle={modalInfo}
        pressHandler={() => {}}
      />
        <Timestamp />
      <View style={styles.main}>

        <Text style={styles.number}>
          {changeLanguage("lottery date")} : {randomLotteryNumbers?.lotteryDate}
        </Text>
        <RandomLotteryNumbers />
        <View style={styles.user_number_container}>
          <Text style={styles.number}>{changeLanguage("your numbers")}!</Text>
          <UserLotteryNumbers column={"firstColumn"} />

          <UserLotteryNumbers column={"secondColumn"} />
        </View>
        <View style={styles.button_container}>
          <Button width={170} onPress={onModalToggle.bind(this, true)}>
            compare
          </Button>
          <Button width={170} onPress={onInfoModalToggle.bind(this, true)}>
            info
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default LotteryPageComponent;

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
