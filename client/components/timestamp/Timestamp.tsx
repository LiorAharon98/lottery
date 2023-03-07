import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
const Timestamp = () => {
  const [helpState, setHelpState] = useState<number>(0);
  dayjs.extend(weekday);
  const nextSunday = dayjs().weekday(7).set("hour", 0).set("minute", 0).set("second", 0).valueOf();
  const nextWednesday = dayjs().weekday(3).set("hour", 0).set("minute", 0).set("second", 0).valueOf();
  const currentM = dayjs().valueOf();

  const finalDay = nextSunday > nextWednesday ? nextWednesday : nextSunday;
  const gap = finalDay - currentM;

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
  return (
    <View style={styles.container}>
      <View style={styles.timestamp_container}>
        <View style={styles.text_container}>
          <Text style={styles.text}>{dayTimestamp} </Text>
          <Text style={styles.text}>days</Text>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text}>{hourTimestamp}</Text>
          <Text style={styles.text}>hours</Text>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text}>{minuteTimestamp}</Text>
          <Text style={styles.text}>minutes</Text>
        </View>
      </View>
    </View>
  );
};

export default Timestamp;
const styles = StyleSheet.create({
  text_container: {
    alignItems: "center",
  },
  container: {
    justifyContent: "space-around",
    height: 70,
    marginBottom: 25,
  },
  header: {
    textAlign: "center",
  },
  timestamp_container: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
  },
});
