import { StyleSheet } from "react-native";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { currentLottery } from "../../types/type";
import { useDataProvider } from "../../context/Data";
import { allLotteryAction } from "../../store/Index";
import Feather from "@expo/vector-icons/Feather";
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
      <Feather style={styles.icon} onPress={handlePress} name="search" size={20} color="black" />
      {toggle && <DateTimePickerAndroid display="default" onChange={confirmDate} value={new Date()} />}
    </>
  );
};

export default LatestLotteryDate;

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,

    marginTop: 10,
    marginLeft: 10,
  },
});
