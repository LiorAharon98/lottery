import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDataProvider } from "../../context/Data";
import { finalDataDate, minute } from "../../context/nextLotteryTimeStamp";
const NextLotteryTimeStamp = () => {
  const [helpState, setHelpState] = useState<number>(0);
  const { changeLanguage } = useDataProvider();

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
      {finalDataDate().map((prev, index) => (
        <View key={index} style={styles.text_container}>
          <Text style={styles.text}>{prev.time.toString().length === 1 ? `0${prev.time}` : `${prev.time}`}</Text>
          <Text>{changeLanguage(prev.label)}</Text>
        </View>
      ))}
    </View>
  );
};

export default NextLotteryTimeStamp;
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
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  text: {
    fontSize: 22,
  },
});
