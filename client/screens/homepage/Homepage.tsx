import React , {useState} from "react";
import { View, StyleSheet, Image } from "react-native";
import Button from "../../components/button/Button";
import { LinearGradient } from "expo-linear-gradient";
import SquareBox from "../../components/square_box/SquareBox";
import { useDataProvider } from "../../context/Data";
const Homepage = ({ navigation }: any) => {
 
  const {user,image,localImageUpload} = useDataProvider()
  const handlePress = (e: string) => {
    if (e ==='sign-in' && Object.keys(user).length>0)return navigation.navigate("user-page")
    navigation.navigate(e);
  };
 
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["lightblue", "rgb(68, 138, 255)"]}
      ></LinearGradient>
      <View style={styles.button_container}>
        <Button onPress={handlePress.bind(this, "sign-in")}>sign in</Button>
        <Button onPress={handlePress.bind(this, "sign-up")}>sign up</Button>
      </View>

      <View style={styles.square_box_container}>
        <View style={styles.square_box_container2}>
          <SquareBox to="/">info</SquareBox>
          <SquareBox  to="/latest-lottery">latest</SquareBox>
        </View>
        <View style={styles.square_box_container2}>
          <SquareBox to="/">news</SquareBox>
          <SquareBox  to="/">test</SquareBox>
        </View>
        <Button onPress={localImageUpload}>tdasdas</Button>
      </View>
    
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 600,
    justifyContent: "space-between",
  },
  header: {
    height: 150,
  },
  button_container: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  square_box_container2: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  square_box_container: {
    height: 300,
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
export default Homepage;
