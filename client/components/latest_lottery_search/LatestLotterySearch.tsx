import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import CalenderIcon from "react-native-vector-icons/FontAwesome";
import { currentLottery } from "../../types/type";
import { useDataProvider } from "../../context/Data";
import LatestLotterySorted from "../latest_lottery_sorted/LatestLotterySorted";
interface props {
  allLottery: currentLottery[];
}
const LatestLotterySearch = ({ allLottery }: props) => {
  const [date, setDate] = useState({
    toggle: false,
    date: null,
  });
  const { currentDate } = useDataProvider();
  const confirmDate = (date: { nativeEvent: { timestamp: number } }) => {
    let test = handleDate(date.nativeEvent.timestamp);

    setDate({ toggle: false, date: test });
  };
  const handlePress = () => {
    setDate({ toggle: true, date: null });
  };

  const handleDate = (date: number) => {
    let dateSelected = date;
    let sort = allLottery.find((current: currentLottery) => current.lotteryDate === currentDate(dateSelected));

    if (sort) {
      return sort;
    } else {
      return null;
    }
  };

  return (
    <View>
      <CalenderIcon onPress={handlePress} style={styles.icon} name="calendar" />
      {date.toggle && <DateTimePickerAndroid display="default" onChange={confirmDate} value={new Date()} />}
      <LatestLotterySorted allLottery={allLottery} date={date} />
    </View>
  );
};

export default LatestLotterySearch;

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    color: "rgb(21, 165, 241)",
    height: 40,
    width: 50,
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    width: 180,
    height: 40,
    backgroundColor: "rgb(21, 165, 241)",
  },
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
