import { View, StyleSheet, Text } from "react-native";
import ButtonHomepage from "../../components/button_homepage/ButtonHomepage";
import { LinearGradient } from "expo-linear-gradient";
import SquareBox from "../../components/square_box/SquareBox";
import { useDataProvider } from "../../context/Data";
const Homepage = ({ navigation }: any) => {
  const { user, changeLanguage } = useDataProvider();
  const handlePress = (e: string) => {
    if (e === "sign-in" && user) return navigation.navigate("user-page");
    navigation.navigate(e);
  };

 
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["rgb(41, 185, 254)", "rgb(156, 220, 254)"]}
      ></LinearGradient>
      <View style={styles.button_container}>
        <View style={{ width: "80%", justifyContent: "space-around", height: 260 }}>
          <ButtonHomepage onPress={handlePress.bind(this, "sign-in")}>{user ? "personal" : "sign in"}</ButtonHomepage>
          <Text style={{ textAlign: "center", fontSize: 20 }}>{changeLanguage("or")}</Text>
          <ButtonHomepage onPress={handlePress.bind(this, "sign-up")}>sign up</ButtonHomepage>
        </View>
      </View>

      <View style={styles.square_box_container}>
        <SquareBox to="/latest-lottery">{changeLanguage("latest")}</SquareBox>
        <SquareBox to="/about-page">{changeLanguage("about")}</SquareBox>
      </View>
      <View></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    height: 150,
  },
  button_container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  square_box_container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
export default Homepage;
