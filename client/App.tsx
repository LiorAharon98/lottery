import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import store from "./store/Index";
import { LogBox, View } from "react-native";
import DataProvider from "./context/Data";
import AppContainer from "./AppContainer";
import * as Font from "expo-font";
import "./language/Data";

LogBox.ignoreLogs(["Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`"]);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          MaterialCommunityIcons: require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
          MaterialIcons: require("react-native-vector-icons/Fonts/MaterialIcons.ttf"),
          AntDesign: require("react-native-vector-icons/Fonts/AntDesign.ttf"),
          FontAwesome: require("react-native-vector-icons/Fonts/FontAwesome.ttf"),
          Entypo: require("react-native-vector-icons/Fonts/Entypo.ttf"),
        });

        await new Promise((resolve) => setTimeout(resolve, 1500));
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

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <DataProvider>
          <AppContainer />
        </DataProvider>
      </Provider>
    </View>
  );
}