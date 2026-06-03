import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDataProvider } from "../../context/Data";
import * as Animatable from "react-native-animatable";
import UserOptionIcon from "../../components/user_option_icon/UserOptionIcon";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Index";
const Homepage = ({ navigation }: any) => {
  const { changeLanguage } = useDataProvider();
    const user = useSelector((state: RootState) => state.user);
  const handlePress = (e: string) => {
    if (e === "sign-in" && user.username) return navigation.push("user-page");
    navigation.navigate(e);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["rgb(55, 103, 255)", "rgb(55, 103, 255)"]}
      ></LinearGradient>

      <View style={styles.button_container}>
        <View style={styles.button_container2}>
          <Animatable.View style={{ flexDirection: "row", alignItems:'center' }} delay={500} animation={"slideInDown"}>
            {user?.profilePicture ? (
              <Pressable onPress={handlePress.bind(this, "user-page")}>
                <Image style={styles.image} source={{ uri: user.profilePicture }} />
              </Pressable>
            ) : (
              <UserOptionIcon
                textColor="black"
                onPress={handlePress.bind(this, "sign-in")}
                text={user.username ? user.username : "sign in"}
              >
                <MaterialIcons name="account-circle" size={40} color="#035efc" />
              </UserOptionIcon>
            )}
            {!user.username && (
              <>
                <Text style={styles.text}>{changeLanguage("or")}</Text>
                <UserOptionIcon
                  textColor="black"
                  onPress={handlePress.bind(this, "sign-up")}
                  text={user.username ? user.username : "sign up"}
                >
                  <MaterialIcons name="account-circle" size={40} color="#035efc" />
                </UserOptionIcon>
              </>
            )}
          </Animatable.View>
        </View>
      </View>

      <View></View>
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
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  button_container: {
    alignItems: "center",
  },
  button_container2: {
    justifyContent: "space-around",
    height: 300,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});
export default Homepage;
