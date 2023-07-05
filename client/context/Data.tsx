import React, { useContext, createContext } from "react";
import axios from "axios";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { userType, props, lotteryType } from "../types/type";
import { useDispatch } from "react-redux";
import { userAction, allLotteryAction } from "../store/Index";
import currentDate from "./currentDate";

const cTable = require("console.table");

export const useDataProvider = () => {
  return useContext(DataContext);
};
export const DataContext = createContext<any>({});

const DataProvider = ({ children }: props) => {
  const dispatch = useDispatch();
  const serverUrl =
    process.env.NODE_ENV === "development"
      ? process.env.CREATE_REACT_APP_LOCAL_URL
      : process.env.CREATE_REACT_APP_HEROKU_URL;
  const { t } = useTranslation();
  const setItemFromStorage = async (user: userType) => {
    await AsyncStorage.setItem("key", JSON.stringify(user));
  };

  const getItemFromStorage = async () => {
    const data = await AsyncStorage.getItem("key");
    if (data) {
      dispatch(userAction.signIn(JSON.parse(data)));
      return JSON.parse(data);
    }
  };

  const changeLanguage = (value: string) => {
    return t(value);
  };

  const userEarnedLottery = async (user: any, username: string, number: number) => {
    const allLottery = await fetchAllLottery();
    if (user?.latestWin.date === allLottery[0].lotteryDate) {
      return;
    }
    const userToFetch = { username, number, date: allLottery[0].lotteryDate };
    const response = await axios.put(`${serverUrl}/lottery-page`, userToFetch);
    dispatch(userAction.earnedMoney(response.data));
    if (user?.bank) {
      let fetchUser = { username, number };

      await axios.put("https://nodejs-bank.herokuapp.com/bank/user/lottery-win", fetchUser);
    }
  };

  const hasBankAccount = async (username: string) => {
    const user = { username };

    const response = await axios.post("https://nodejs-bank.herokuapp.com/bank/user/lottery", user);
    if (response.data) {
      await axios.put(`${serverUrl}/user/bank`, user);
      dispatch(userAction.addBank());
    }
  };
  const addLotteryNumbersToUser = async (arr: lotteryType[][], username: string) => {
    const user = { arr, username };
    const response = await axios.put(`${serverUrl}/create-user-lottery-numbers`, user);
    dispatch(userAction.addLotteryNumbers(response.data));
  };
  const changePassword = async (username: userType, password: userType) => {
    const user = { username, passwordToChange: password };
    await axios.post(`${serverUrl}/user-setting`, user);
  };

  const addUser = async (username: userType, password: userType) => {
    const user = {
      username,
      password,
      memberSince: currentDate(null),
      earned: 0,
      latestWin: { date: "", number: 0 },
      bank: false,
    };
    const userFetch = await axios.post(`${serverUrl}/sign-up`, user);
    if (userFetch.data) dispatch(userAction.signIn(userFetch.data));
    return userFetch.data;
  };
  const selectedUser = async (username: userType, password: userType) => {
    const user = { username, password };
    const userFetch = await axios.post(`${serverUrl}/sign-in`, user);
    if (userFetch.data) {
      dispatch(userAction.signIn(userFetch.data));
      return userFetch.data;
    }
    return false;
  };
  const fetchLatestLottery = async () => {
    const response = await axios.get(`${serverUrl}/latest-lottery`);
    return response.data;
  };

  const fetchAllLottery = async () => {
    const response = await axios.get(`${serverUrl}/all-lottery`);
    dispatch(allLotteryAction.addAllLottery(response.data));
    return response.data;
  };
  const logOut = async () => {
    dispatch(userAction.logOut());
    AsyncStorage.removeItem("key");
  };
  const localImageUpload = async (username: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      uploadImageToFirebase(username, result.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async (username: string, image: string) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, `/profile-images/${username}${currentDate(null)}`);
    const testImage = await (await fetch(image)).blob();

    try {
      await uploadBytesResumable(storageRef, testImage, metadata);

      const pictureUrl = await getDownloadURL(storageRef);
      const userInfo = { profilePicture: pictureUrl, username };
      const response = await axios.put(`${serverUrl}/user-setting`, userInfo);
      dispatch(userAction.addImg(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    setItemFromStorage,
    hasBankAccount,
    currentDate,
    changePassword,
    getItemFromStorage,
    changeLanguage,
    fetchAllLottery,
    fetchLatestLottery,
    userEarnedLottery,
    logOut,
    addUser,
    localImageUpload,
    selectedUser,
    addLotteryNumbersToUser,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
