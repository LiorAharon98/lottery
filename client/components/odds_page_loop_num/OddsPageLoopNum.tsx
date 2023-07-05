import { StyleSheet, Text, View,ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import Button from "../button/Button";
const OddsPageLoopNum = ({ loopNumber,calculatorLoops  } : any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handlePress = async (column: string) => {
        setLoading(true);
        await calculatorLoops(column);
        setLoading(false);
      };
  return (
    <>
      {Boolean(loopNumber) && (
        <>
          <Text style={styles.text}>{loopNumber}</Text>
          <Animatable.View duration={700} animation={"slideInUp"} style={styles.button_container}>
            <Button onPress={handlePress.bind(this, "firstColumn")}>first column</Button>
            <Button onPress={handlePress.bind(this, "secondColumn")}>second column</Button>
          </Animatable.View>
        </>
      )}
         {loading && (
          <View>
            <ActivityIndicator color={"rgb(55, 185, 255)"} size={30} />
          </View>
        )}
    </>
  );
};

export default OddsPageLoopNum;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: "center",
      },
      button_container: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
      },
});
