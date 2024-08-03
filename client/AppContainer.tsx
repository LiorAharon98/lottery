import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./screens/homepage/Homepage";
import LotteryPage from "./screens/lottery_page/LotteryPage";
import SignIn from "./screens/sign_in/SignIn";
import SignUp from "./screens/sign_up/SignUp";
import { useState } from "react";
import UserPage from "./screens/user_page/UserPage";
import CreateUserLotteryNumber from "./screens/create_user_lottery_number/CreateUserLotteryNumber ";
import LatestLottery from "./screens/latest_lottery/LatestLottery";
import UserSetting from "./screens/user_setting/UserSetting";
import OddsPage from "./screens/odds_page/OddsPage";
import BankScreen from "./screens/bank_screen/BankScreen";
import About from "./screens/about/About";
import Footer from "./components/footer/Footer";
import { useDataProvider } from "./context/Data";
import React from "react";

const AppContainer = () => {
  const Stack = createNativeStackNavigator();
  const [initialRoute, setInitialRoute] = useState("");
  const { getItemFromStorage } = useDataProvider();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
      primary: "rgb(255, 255, 255)",
    },
  };
  const handleEffect = async () => {
    try {
      const item = await getItemFromStorage();

      setInitialRoute(item && item.username ? "user-page" : "home");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleEffect();
  }, []);
  if (!initialRoute) return;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{ headerStyle: { backgroundColor: "white"}, headerTitle: "", headerBackVisible: true  ,}}
        >
          {initialRoute === "user-page" ? (
            <>
              <Stack.Screen name="user-page" component={UserPage} />
              <Stack.Screen name="home" component={Homepage} />
            </>
          ) : (
            <>
              <Stack.Screen name="home" component={Homepage} />
              <Stack.Screen name="user-page" component={UserPage} />
            </>
          )}

          <Stack.Screen name="sign-in" component={SignIn} />
          <Stack.Screen name="sign-up" component={SignUp} />
          <Stack.Screen name="create-user-lottery-numbers" component={CreateUserLotteryNumber} />

          <Stack.Screen name="lottery-page" component={LotteryPage} />
          <Stack.Screen name="setting-page" component={UserSetting} />
          <Stack.Screen name="latest-lottery" component={LatestLottery} />
          <Stack.Screen name="odds-page" component={OddsPage} />
          <Stack.Screen name="bank-page" component={BankScreen} />
          <Stack.Screen name="about-page" component={About} />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
    </View>
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
