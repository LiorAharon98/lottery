import React, { useContext, createContext, ReactNode, useState } from "react";
import axios from "axios";
import { ref, getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import * as imagePicker from "expo-image-picker";
import i18next from "../language/Data";
import { useTranslation } from "react-i18next";

interface props {
  children: ReactNode;
}

interface allLottery {
  lotteryNumbers: { number: number; special: boolean }[];
  lotteryDate: string;
}
interface userType {
  username: string;
  password: string;
  pictureUrl: string;
  earned: number;
  latestWin: { number: number; date: string };
}

export const useDataProvider = () => {
  return useContext(DataContext);
};
export const DataContext = createContext<any>({});

const DataProvider = ({ children }: props) => {
  const [randomLotteryNumbers, setRandomLotteryNumbers] = useState<allLottery>({} as allLottery);
  const [user, setUser] = useState<userType | null>(null);
  const [allLottery, setAllLottery] = useState<allLottery[]>([]);
  const localUrl = "http://192.168.50.173:8000/lottery";
  const herokuUrl = "https://lottery-node-js.herokuapp.com/lottery";
  const { t } = useTranslation();
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
        100000;
        break;
      case 6:
        1000000;
    }

    const userPrize = isSpecial ? tempNum * 2 : tempNum * 1;

    return userPrize;
  };
  const changeLanguage = (value: string) => {
    return t(value);
  };
  const compareNumbers = (userArrLotteryNumbers: { number: number; special: boolean }[]) => {
    let cnt = 0;
    let isSpecial = false;
    for (let i = 0; i < randomLotteryNumbers?.lotteryNumbers?.length; i++) {
      if (
        userArrLotteryNumbers.filter(
          (currentNum) =>
            currentNum.number === randomLotteryNumbers?.lotteryNumbers[i]?.number &&
            currentNum.special === randomLotteryNumbers?.lotteryNumbers[i]?.special
        ).length > 0
      ) {
        if (randomLotteryNumbers?.lotteryNumbers[i].special) {
          isSpecial = true;
        }
        cnt++;
      }
    }
    return { cnt, prize: prize(cnt, isSpecial) };
  };
  const userEarnedLottery = async (username: string, number: number) => {
    if (user?.latestWin.date === allLottery[0].lotteryDate) {
      return;
    }
    const userToFetch = { username, number, date: allLottery[0].lotteryDate };
    const response = await axios.put(`${localUrl}/lottery-page`, userToFetch);
    setUser(response.data);
  };
  const addLotteryNumbersToUser = async (arr: [{ number: number; special: number }], username: string) => {
    const user = { arr, username };
    const response = await axios.put(`${localUrl}/create-user`, user);

    setUser(response.data);
  };

  const currentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const addUser = async (username: string, password: string) => {
    const user = { username, password, memberSince: currentDate(), earned: 0, latestWin: 0 };
    const userFetch = await axios.post(`${localUrl}/sign-up`, user);
    if (userFetch.data) setUser(userFetch.data);
    return userFetch.data;
  };
  const selectedUser = async (username: string, password: string) => {
    const user = { username, password };
    const userFetch = await axios.post(`${localUrl}/sign-in`, user);
    if (userFetch.data) {
      setUser(userFetch.data);
      return userFetch.data;
    }
    return false;
  };
  const fetchLotteryNumbers = async () => {
    const response = await axios.get(`${localUrl}/lottery-page`);
    setRandomLotteryNumbers(response.data);
  };

  const fetchAllLottery = async () => {
    const response = await axios.get(`${localUrl}/latest-lottery`);

    setAllLottery(response.data);
  };
  const logOut = () => {
    setUser(null);
  };
  const localImageUpload = async () => {
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      uploadImageToFirebase(result.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async (image: any) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, `/profile-images/${user?.username}${currentDate()}`);
    const testImage = await (await fetch(image)).blob();

    try {
      await uploadBytesResumable(storageRef, testImage, metadata);

      const pictureUrl = await getDownloadURL(storageRef);
      const userInfo = { profilePicture: pictureUrl, username: user?.username };
      const response = await axios.put(`${localUrl}/user-setting`, userInfo);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
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
