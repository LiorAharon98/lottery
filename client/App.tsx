import { StatusBar } from "expo-status-bar";
import Footer from "./components/footer/Footer";
import Homepage from "./screens/homepage/Homepage";
import { NavigationContainer } from "@react-navigation/native";
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
LogBox.ignoreLogs([" Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`"]);
import "./language/Data";
export default function App() {
  const Stack = createNativeStackNavigator();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <DataProvider>
      <StatusBar style="auto" />
      <NavigationContainer theme={{ colors: { background: "white" } }}>
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
          <Stack.Screen name="about-page" component={About} />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
    </DataProvider>
  );
}
