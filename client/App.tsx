import { StatusBar } from "expo-status-bar";
import { Text,View } from "react-native";
import Header from "./components/header/Header";
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
import  "./language/Data"

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <DataProvider>
      <StatusBar style="auto" />

      <NavigationContainer>
   
        <Stack.Navigator screenOptions={{ headerStyle : {backgroundColor : 'white'} ,headerTitle : '' , headerBackVisible : false}}>
          <Stack.Screen name="home" component={Homepage} />
          <Stack.Screen name="sign-in" component={SignIn} />
          <Stack.Screen name="sign-up" component={SignUp} />
          <Stack.Screen name="create-user" component={CreateUserLotteryNumber} />
          <Stack.Screen name="user-page" component={UserPage} />
          <Stack.Screen name="lottery-page" component={LotteryPage} />
          <Stack.Screen name="setting-page" component={UserSetting} />
          <Stack.Screen name="latest-lottery" component={LatestLottery} />
          <Stack.Screen name="odds-page" component={OddsPage} />
          <Stack.Screen name="about-page" component={About} />
        </Stack.Navigator>
      <Footer  />
      </NavigationContainer>
    </DataProvider>
  );
}


