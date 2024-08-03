import { StyleSheet } from "react-native";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { currentLottery } from "../../types/type";
import { useDataProvider } from "../../context/Data";
import { allLotteryAction } from "../../store/Index";
import SearchIcon from "react-native-vector-icons/EvilIcons";

import { useDispatch, useSelector } from "react-redux";

const LatestLotteryDate = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { allLottery } = useSelector((state) => state.allLottery);
  const dispatch = useDispatch();
  const { currentDate } = useDataProvider();
  const handleDate = (date: number) => {
    let dateSelected = date;
    let sort = allLottery.find((current: currentLottery) => current.lotteryDate === currentDate(dateSelected));
    return sort ? sort : {};
  };
  const handlePress = () => {
    setToggle((prev) => !prev);
  };
  const confirmDate = (date: { nativeEvent: { timestamp: number } }) => {
    let sortedDate = handleDate(date.nativeEvent.timestamp);
    setToggle(false);
    dispatch(allLotteryAction.addSortedLottery(sortedDate));
  };
  return (
    <>
      <SearchIcon onPress={handlePress} style={styles.icon} name="search" />
      {toggle && <DateTimePickerAndroid display="default" onChange={confirmDate} value={new Date()} />}
    </>
  );
};

export default LatestLotteryDate;

const styles = StyleSheet.create({
  icon: {
    fontSize: 40,

    marginTop: 10,
    marginLeft: 10,
  },
});
