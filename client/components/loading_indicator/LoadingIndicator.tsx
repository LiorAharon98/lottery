import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Button from "../button/Button";

const LoadingIndicator = ({ calculatorLoops }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handlePress = async (column: string) => {
    setLoading(true);
    await calculatorLoops(column);
    setLoading(false);
  };
  return (
    <View>
      <View style={styles.btn}>
        <Button onPress={handlePress.bind(this, "firstColumn")}>first column</Button>
        <Button onPress={handlePress.bind(this, "secondColumn")}>second column</Button>
      </View>
      {loading && <ActivityIndicator color={"rgb(55, 185, 255)"} size={30} />}
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
  },
});
