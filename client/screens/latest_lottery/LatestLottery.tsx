import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useDataProvider } from "../../context/Data";
import Number from "../../components/number/Number";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";
import LatestLotterySearch from "../../components/latest_lottery_search/LatestLotterySearch";
import { currentLottery } from "../../types/type";
const LatestLottery = () => {
  const { fetchAllLottery, allLottery, currentDate } = useDataProvider();
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [sortLotteryByDate, setSortLotteryByDate] = useState<currentLottery>({} as currentLottery);
  const handleFunc = async () => {
    setToggleModal(true);
    await fetchAllLottery();
    setToggleModal(false);
  };
  useEffect(() => {
    handleFunc();
  }, []);

  const allLotterySort : currentLottery[] = allLottery.sort((a: { id: number }, b: { id: number }) => {
    return a.id > b.id ? -1 : 1;
  });

  
  const handleDate = (date: number) => {
    let dateSelected = date;
    let sort = allLottery.find((current: currentLottery) => current.lotteryDate === currentDate(dateSelected));
    if (sort) {
      setSortLotteryByDate(sort);
    }
    else if (!sort && Object.keys(sortLotteryByDate).length > 0) {
      setSortLotteryByDate({} as currentLottery);
    }
  };
  return (
    <View style={{ height: "100%" }}>
      <LoadingScreen onToggleModal={setToggleModal.bind(this, false)} toggle={toggleModal} />

      <LatestLotterySearch allLotterySort={allLotterySort} handleDate={handleDate} />
      {sortLotteryByDate && Object.keys(sortLotteryByDate).length > 0 && (
        <View style={styles.container}>
          <Text style={styles.lottery_date}>{sortLotteryByDate.lotteryDate}</Text>
          <View style={styles.number_container}>
            {sortLotteryByDate.lotteryNumbers.map((currentNum: { number: number; special: boolean }, index: number) => (
              <Number key={index} isSpecial={currentNum.special}>
                {currentNum.number}
              </Number>
            ))}
          </View>
        </View>
      )}
      {Object.keys(sortLotteryByDate).length === 0 && (
        <FlatList
          data={allLotterySort}
          renderItem={(item) => {
            return (
              <View style={styles.container}>
                <Text style={styles.lottery_date}>{item.item.lotteryDate}</Text>
                <View style={styles.number_container}>
                  {item.item.lotteryNumbers.map((currentNum: { number: number; special: boolean }, index: number) => (
                    <Number key={index} isSpecial={currentNum.special}>
                      {currentNum.number}
                    </Number>
                  ))}
                </View>
              </View>
            );
          }}
        >
          <View></View>
        </FlatList>
      )}
    </View>
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
  lottery_date: {
    fontSize: 18,
  },
});
