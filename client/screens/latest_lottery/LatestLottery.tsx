import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Card from "../../components/card/Card";
import { useDataProvider } from "../../context/Data";
import Number from "../../components/number/Number";
const LatestLottery = () => {
  const { fetchAllLottery, allLottery } = useDataProvider();
  useEffect(() => {
    fetchAllLottery();
  }, []);
  interface currentLottery {
    lotteryNumbers: { number: number; special: boolean }[];
    lotteryDate: string;
  }
  return (
    <View>
      <Card>
        {allLottery?.map((currentLottery: currentLottery, index: number) => {
          return (
            <View key={index}>
              <Text>{currentLottery.lotteryDate}</Text>
              <View style={styles.number_container}>

              {currentLottery.lotteryNumbers.map(currentNum =>  <Number  isSpecial={currentNum.special}>{currentNum.number}</Number>)}
              </View>
            </View>
          );
        })}
      </Card>
    </View>
  );
};

export default LatestLottery;

const styles = StyleSheet.create({
  number_container:{
    flexDirection : 'row'
  }
});
