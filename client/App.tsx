import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import store from "./store/Index";
import { LogBox, View } from "react-native";
import axios from "axios";
import DataProvider from "./context/Data";
import AppContainer from "./AppContainer";
import "./language/Data";
LogBox.ignoreLogs([" Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`"]);
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        if (process.env.NODE_ENV === "production") {
          axios.get(`${process.env.EXPO_PUBLIC_HEROKU_URL}/latest-lottery`);
        }

        await new Promise((resolve) => setTimeout(resolve, 2500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useMemo(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View style={{flex:1}}>

    <Provider store={store}>
      <DataProvider>
        <AppContainer />
      </DataProvider>
    </Provider>
    </View>
  );
}
