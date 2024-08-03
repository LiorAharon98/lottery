import { StyleSheet, Text, View, FlatList } from "react-native";
import Number from "../number/Number";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
const LatestLotterySorted = () => {
  const { allLottery, sortedLottery } = useSelector((state) => state.allLottery);
  const data = () => {
    if (!Object.keys(sortedLottery).length) return allLottery;
    return [sortedLottery];
  };
  return (
      
        <FlatList 
        style={{height :'90%'}}
          data={data()}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            return (
              <Animatable.View  duration={2000} delay={500}  animation={"fadeIn"} style={styles.container}>
                <Text style={styles.lottery_date}>{item.item.lotteryDate}</Text>
                <View style={styles.number_container}>
                  {item.item.lotteryNumbers.map((currentNum: { number: number; special: boolean }, index: number) => (
                    <Number key={index} isSpecial={currentNum.special}>
                      {currentNum.number}
                    </Number>
                  ))}
                </View>
              </Animatable.View>
            );
          }}
        ></FlatList>
      
  );
};

export default LatestLotterySorted;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 120,
    marginTop: 20,
  },
  number_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  lottery_date: {
    fontSize: 18,
  },
});
