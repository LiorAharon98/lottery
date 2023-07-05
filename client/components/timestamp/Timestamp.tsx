import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";

import { useDataProvider } from "../../context/Data";
const Timestamp = () => {
  const [helpState, setHelpState] = useState<number>(0);
  const { changeLanguage } = useDataProvider();

  const currentDate = dayjs().valueOf();

  const currentDay = new Date().getDay();

  let tempNum = Number();
  switch (currentDay) {
    case 0:
      tempNum = 3;
      break;
    case 1:
      tempNum = 2;
      break;
    case 2:
      tempNum = 1;
      break;
    case 3:
      tempNum = 4;
      break;
    case 4:
      tempNum = 3;
      break;
    case 5:
      tempNum = 2;
      break;
    case 6:
      tempNum = 1;
      break;
  }

  const specificDay = dayjs()
    .set("day", currentDay + tempNum)
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .valueOf();
  const gap = specificDay - currentDate;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const dayTimestamp = Math.floor(gap / day);
  const hourTimestamp = Math.floor((gap % day) / hour);
  const minuteTimestamp = Math.floor((gap % hour) / minute);
  useEffect(() => {
    const interval = setInterval(() => {
      setHelpState((prev) => prev + 1);
    }, minute);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const data = [
    { label: "days", time: dayTimestamp },
    { label: "hours", time: hourTimestamp },
    { label: "minuets", time: minuteTimestamp },
  ];
  return (
    <View style={styles.container}>
      {data.map((prev, index) => (
        <LinearGradient colors={["rgb(90, 185, 251)", "rgb(55, 130, 255)"]} key={index} style={styles.text_container}>
          <Text style={styles.text}>{prev.time.toString().length ===1 ? `0${prev.time}` : `${prev.time}`}</Text>
          <Text style={{ color: "white" }}>{changeLanguage(prev.label)}</Text>
        </LinearGradient>
      ))}
    </View>
  );
};

export default Timestamp;
const styles = StyleSheet.create({
  text_container: {
    alignItems: "center",
    height: 55,
    marginTop: 10,
    marginBottom: 20,
    width: 60,
    justifyContent: "center",
    borderRadius: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  text: {
    color: "white",
    fontSize: 22,
  },
});
