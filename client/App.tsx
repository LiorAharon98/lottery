import { StatusBar } from "expo-status-bar";
import Footer from "./components/footer/Footer";
import Homepage from "./screens/homepage/Homepage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DataProvider from "./context/Data";
import LotteryPage from "./screens/lottery_page/LotteryPage";
import SignIn from "./screens/sign_in/SignIn";
import SignUp from "./screens/sign_up/SignUp";
import UserPage from "./screens/user_page/UserPage";
import CreateUserLotteryNumber from "./screens/create_user_lottery_number/CreateUserLotteryNumber ";
import LatestLottery from "./screens/latest_lottery/LatestLottery";
import UserSetting from "./screens/user_setting/UserSetting";
import About from "./screens/about/About";
import OddsPage from "./screens/odds_page/OddsPage";
import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import BankScreen from "./screens/bank_screen/BankScreen";
import axios from "axios";
import store from "./store/Index";
import { Provider } from "react-redux";
LogBox.ignoreLogs([" Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`"]);
import "./language/Data";
export default function App() {
  const Stack = createNativeStackNavigator();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await axios.get("https:lottery-node-js.herokuapp.com/lottery/lottery-page");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
      primary: "rgb(255, 255, 255)",
    },
  };

  return (
    <Provider store={store}>
      <DataProvider>
        <StatusBar style="auto" />
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: "white" }, headerTitle: "", headerBackVisible: false }}
          >
            <Stack.Screen name="home" component={Homepage} />
            <Stack.Screen name="sign-in" component={SignIn} />
            <Stack.Screen name="sign-up" component={SignUp} />
            <Stack.Screen name="create-user-lottery-numbers" component={CreateUserLotteryNumber} />
            <Stack.Screen name="user-page" component={UserPage} />
            <Stack.Screen name="lottery-page" component={LotteryPage} />
            <Stack.Screen name="setting-page" component={UserSetting} />
            <Stack.Screen name="latest-lottery" component={LatestLottery} />
            <Stack.Screen name="odds-page" component={OddsPage} />
            <Stack.Screen name="bank-page" component={BankScreen} />
            <Stack.Screen name="about-page" component={About} />
          </Stack.Navigator>
          <Footer />
        </NavigationContainer>
      </DataProvider>
    </Provider>
  );
}
