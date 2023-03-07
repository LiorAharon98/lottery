import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDataProvider } from "../../context/Data";
import Number from "../../components/number/Number";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";

const LatestLottery = () => {
  const { fetchAllLottery, allLottery } = useDataProvider();
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const handleFunc = async () => {
    setToggleModal(true);
    await fetchAllLottery();
    setToggleModal(false);
  };
  useEffect(() => {
    handleFunc();
  }, []);
  const allLotterySort = allLottery.sort((a: { id: number }, b: { id: number }) => {
    return a.id > b.id ? -1 : 1;
  });
  interface currentLottery {
    lotteryNumbers: { number: number; special: boolean }[];
    lotteryDate: string;
  }
  return (
    <ScrollView>
      <LoadingScreen onToggleModal={setToggleModal.bind(this, false)} toggle={toggleModal} />
      <View style={{flex :1}}>

      {allLotterySort?.map((currentLottery: currentLottery, index: number) => {
        return (
          <View style={styles.container} key={index + 1}>
            <Text style={styles.lottery_date}>{currentLottery.lotteryDate}</Text>
            <View style={styles.number_container}>
              {currentLottery.lotteryNumbers.map((currentNum, index) => (
                <Number key={index} isSpecial={currentNum.special}>
                  {currentNum.number}
                </Number>
              ))}
            </View>
          </View>
        );
      })}
      </View>
    </ScrollView>
  );
};

export default LatestLottery;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 110,
    marginTop: 20,
  },
  number_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "85%",
  },
  lottery_date:{
    fontSize : 18,
    
  }
});
