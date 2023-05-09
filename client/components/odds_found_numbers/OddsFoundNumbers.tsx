import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Number from "../number/Number";
import { useDataProvider } from "../../context/Data";
interface props {
  foundNum: { foundNumbers: {number : number,special : boolean}[]; foundCnt: number };
}
const OddsFoundNumbers = ({ foundNum }: props) => {
  const { changeLanguage } = useDataProvider();
  return (
    <View style={styles.container}>
      <View style={styles.numbers_container}>
        {foundNum.foundNumbers.map((prev, index) => (
          <Number isSpecial={prev.special} key={index}>{`${prev.number}`}</Number>
        ))}
      </View>
      <View>
        <Text style={styles.text}>
          {changeLanguage("founds after")} {foundNum.foundCnt} {changeLanguage("loops")}
        </Text>
      </View>
    </View>
  );
};

export default OddsFoundNumbers;

const styles = StyleSheet.create({
  container: { justifyContent: "space-around", alignItems: "center", height: 120 },
  numbers_container: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: "80%",
  },
  text: {
    fontSize: 20,
  },
});
