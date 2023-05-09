import React, { useContext, createContext, useState } from "react";
import axios from "axios";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { userType, props, lotteryType, currentLottery } from "../types/type";
const cTable = require("console.table");

export const useDataProvider = () => {
  return useContext(DataContext);
};
export const DataContext = createContext<any>({});

const DataProvider = ({ children }: props) => {
  const [randomLotteryNumbers, setRandomLotteryNumbers] = useState<currentLottery>({} as currentLottery);
  const [user, setUser] = useState<userType | null>(null);
  const [allLottery, setAllLottery] = useState<currentLottery[]>([]);

  const serverUrl =
    process.env.NODE_ENV === "development"
      ? "http:192.168.50.173:8000/lottery"
      : "https:lottery-node-js.herokuapp.com/lottery";
  const { t } = useTranslation();
  const getItemFromStorage = async () => {
    const data = await AsyncStorage.getItem("key");
    if (data) {
      setUser(JSON.parse(data));
    }
  };
  const prize = (num: number, isSpecial: boolean) => {
    let tempNum = 0;
    switch (num) {
      case 1:
        tempNum = 20;
        break;
      case 2:
        tempNum = 200;
        break;
      case 3:
        tempNum = 500;
        break;
      case 4:
        tempNum = 5000;
        break;
      case 5:
        tempNum = 100000;
        break;
      case 6:
        tempNum = 1000000;
    }

    const userPrize = isSpecial ? tempNum * 3 : tempNum * 1;
    return userPrize;
  };
  const changeLanguage = (value: string) => {
    return t(value);
  };
  const compareNumbers = (
    userArrLotteryNumbers: lotteryType[],
    lotteryToCompare: { lotteryNumbers: lotteryType[] }
  ) => {
    let foundsNumbers: any = [];
    let cnt = 0;
    let isSpecial = false;

    for (let i = 0; i < lotteryToCompare?.lotteryNumbers?.length; i++) {
      if (
        userArrLotteryNumbers.filter(
          (currentNum) =>
            currentNum.number === lotteryToCompare?.lotteryNumbers[i]?.number &&
            currentNum.special === lotteryToCompare?.lotteryNumbers[i]?.special
        ).length > 0
      ) {
        if (lotteryToCompare?.lotteryNumbers[i]?.special) {
          isSpecial = true;
        }

        foundsNumbers.push({ number: userArrLotteryNumbers[i].number, special: isSpecial });
        cnt++;
      }
    }

    return { cnt, prize: prize(cnt, isSpecial), special: isSpecial, foundsNumbers };
  };
  const userEarnedLottery = async (username: string, number: number) => {
    const allLottery = await fetchAllLottery();
    if (user?.latestWin.date === allLottery[allLottery.length - 1].lotteryDate) {
      return;
    }
    const userToFetch = { username, number, date: allLottery[allLottery.length - 1].lotteryDate };
    const response = await axios.put(`${serverUrl}/lottery-page`, userToFetch);
    setUser(response.data);
  };
  const addLotteryNumbersToUser = async (arr: lotteryType[][], username: string) => {
    const user = { arr, username };
    const response = await axios.put(`${serverUrl}/create-user-lottery-numbers`, user);

    setUser(response.data);
  };
  const changePassword = async (username: userType, password: userType) => {
    const user = { username, passwordToChange: password };
    await axios.post(`${serverUrl}/user-setting`, user);
  };

  const currentDate = (dateParam: any) => {
    const date = dateParam ? new Date(dateParam) : new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const addUser = async (username: userType, password: userType) => {
    const user = { username, password, memberSince: currentDate(null), earned: 0, latestWin: { date: "", number: 0 } };
    const userFetch = await axios.post(`${serverUrl}/sign-up`, user);
    if (userFetch.data) setUser(userFetch.data);
    return userFetch.data;
  };
  const selectedUser = async (username: userType, password: userType) => {
    const user = { username, password };
    const userFetch = await axios.post(`${serverUrl}/sign-in`, user);
    if (userFetch.data) {
      setUser(userFetch.data);
      return userFetch.data;
    }
    return false;
  };
  const fetchLotteryNumbers = async () => {
    const response = await axios.get(`${serverUrl}/lottery-page`);
    setRandomLotteryNumbers(response.data);
  };

  const fetchAllLottery = async () => {
    const response = await axios.get(`${serverUrl}/latest-lottery`);

    setAllLottery(response.data);
    return response.data;
  };
  const logOut = async () => {
    setUser(null);
    AsyncStorage.removeItem("key");
  };
  const localImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      uploadImageToFirebase(result.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async (image: string) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, `/profile-images/${user?.username}${currentDate(null)}`);
    const testImage = await (await fetch(image)).blob();

    try {
      await uploadBytesResumable(storageRef, testImage, metadata);

      const pictureUrl = await getDownloadURL(storageRef);
      const userInfo = { profilePicture: pictureUrl, username: user?.username };
      const response = await axios.put(`${serverUrl}/user-setting`, userInfo);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    currentDate,
    changePassword,
    getItemFromStorage,
    changeLanguage,
    allLottery,
    fetchAllLottery,
    fetchLotteryNumbers,
    userEarnedLottery,
    logOut,
    randomLotteryNumbers,
    compareNumbers,
    addUser,
    localImageUpload,
    selectedUser,
    user,
    addLotteryNumbersToUser,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
