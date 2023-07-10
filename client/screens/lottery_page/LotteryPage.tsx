import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import RandomLotteryNumbers from "../../components/random_lottery_numbers/RandomLotteryNumbers";
import { useDataProvider } from "../../context/Data";
import ModalLottery from "../../components/modal_lottery/ModalLottery";
import UserLotteryNumbers from "../../components/user_lottery_numbers/UserLotteryNumbers";
import { currentLottery } from "../../types/type";
import LotteryPageButtons from "../../components/lottery_page_buttons/LotteryPageButtons";
import compareNumbers from "../../context/compareNumbers";
import { useSelector } from "react-redux";
interface columnType {
  cnt: number;
  prize: number;
  special: boolean;
}

const LotteryPage = () => {
  const { fetchLatestLottery, changeLanguage } = useDataProvider();
  const [randomLotteryNumbers, setRandomLotteryNumbers] = useState<currentLottery>({} as currentLottery);
  const user = useSelector((state) => state.user);
  const countGuessAndPrizes: { firstColumn: columnType; secondColumn: columnType } = useMemo(() => {
    let temp = {
      firstColumn: compareNumbers(user.lotteryNumbers.firstColumn, randomLotteryNumbers),

      secondColumn: compareNumbers(user.lotteryNumbers.secondColumn, randomLotteryNumbers),
    };

    return temp;
  }, [randomLotteryNumbers]);

  const handleFetchLottery = async () => {
    const latestLottery = await fetchLatestLottery(randomLotteryNumbers);
    setRandomLotteryNumbers(latestLottery);
  };

  useEffect(() => {
    handleFetchLottery();
  }, []);
  return (
    <ScrollView>
      <ModalLottery randomLotteryNumbers={randomLotteryNumbers} countGuessAndPrizes={countGuessAndPrizes} />
      <View style={styles.main}>
        <Text style={styles.number}>
          {changeLanguage("lottery date")} : {randomLotteryNumbers?.lotteryDate}
        </Text>
        <RandomLotteryNumbers arr={randomLotteryNumbers} />
        <View style={styles.user_number_container}>
          <Text style={styles.number}>{changeLanguage("your numbers")}!</Text>
          <UserLotteryNumbers column={"firstColumn"} />

          <UserLotteryNumbers column={"secondColumn"} />
        </View>
        <LotteryPageButtons countGuessAndPrizes={countGuessAndPrizes} />
      </View>
    </ScrollView>
  );
};

export default LotteryPage;

const styles = StyleSheet.create({
  main: {
    height: 600,
    alignItems: "center",
    justifyContent: "center",
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
