import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDataProvider } from "../../context/Data";
import * as Animatable from "react-native-animatable";
import UserOptionIcon from "../../components/user_option_icon/UserOptionIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
const Homepage = ({ navigation }: any) => {
  const {changeLanguage, getItemFromStorage } = useDataProvider();
  const user = useSelector(state=>state.user)
  const handlePress = (e: string) => {
    if (e === "sign-in" && user.username) return navigation.push("user-page");
    navigation.navigate(e);
  };
  const handleEffect = async () => {
    const item = await getItemFromStorage();
    if (item) navigation.push("user-page");
  };
  useEffect(() => {
    handleEffect();
  }, []);
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["rgb(55, 103, 255)", "rgb(156, 220, 254)"]}
      ></LinearGradient>

      <View style={styles.button_container}>
        <View style={styles.button_container2}>
          <Animatable.View delay={500} animation={"slideInDown"}>
            {user?.profilePicture ? (
              <Pressable onPress={handlePress.bind(this, "user-page")}>
                <Image style={styles.image} source={{ uri: user.profilePicture }} />
              </Pressable>
            ) : (
              <UserOptionIcon onPress={handlePress.bind(this, "sign-in")} text={user.username ? user.username : "sign in"}>
                <Icon name="account" size={35} />
              </UserOptionIcon>
            )}
          </Animatable.View>
          {!user && (
            <>
              <Text style={{ textAlign: "center", fontSize: 20 }}>{changeLanguage("or")}</Text>
              <Animatable.View delay={500} animation={"slideInDown"}>
                <UserOptionIcon onPress={handlePress.bind(this, "sign-up")} text={"sign up"}>
                  <Icon name="account" size={35} />
                </UserOptionIcon>
              </Animatable.View>
            </>
          )}
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
    justifyContent: "space-between",
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
});
export default Homepage;
