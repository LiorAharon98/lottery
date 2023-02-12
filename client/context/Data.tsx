import React, { useContext, createContext, ReactNode, useState } from "react";
import axios from "axios";
import {ref,getDownloadURL,uploadBytes,updateMetadata} from "firebase/storage"
import {storage} from "../firebase"
import * as imagePicker from "expo-image-picker"
interface props {
  children: ReactNode;
}
interface randomNumberType {
  lotteryNumbers: { number: number; special: boolean }[];
  lotteryData: string;
}
interface  allLottery  {
  lotteryNumbers: { number: number; special: boolean }[];
  lotteryData: string;
}

export const useDataProvider = () => {
  
  return useContext(DataContext);
};
export const DataContext = createContext<any>({});

const DataProvider = ({ children }: props) => {
  const [randomLotteryNumbers, setRandomLotteryNumbers] = useState<allLottery>({} as allLottery);
  const [image,setImage] = useState("")
  const [user, setUser] = useState<{} | null>({});
  const [allLottery,setAllLottery] = useState<allLottery[]>()
  const localUrl = "http://192.168.50.173:8000/lottery";
  const prize = (num: number, isSpecial: boolean) => {
    const userPrize = isSpecial ? num * 1000 : num * 500;
    return userPrize;
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
    const user = { username, number };
    const response = await axios.put(`${localUrl}/lottery-page`, user);
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
    const user = { username, password, memberSince: currentDate(), earned: 0 };
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
  const fetchAllLottery = async()=>{
const response = await axios.get(`${localUrl}/latest-lottery`)
setAllLottery(response.data)
  }
  const logOut = () => {
    setUser({});
  };
  const localImageUpload = async()=>{
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes : imagePicker.MediaTypeOptions.All,
      allowsEditing : true,
      aspect : [4,3],
      quality :1,
      
    })
    if(!result.canceled){
      // setImage(result.assets[0].uri)
      uploadImageToFirebase(result.assets)
    }
  }
 
  const uploadImageToFirebase =async(image : any)=>{
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(storage, `/profile-images/test.jpg`);
    try {
      await uploadBytes(storageRef, image);

      const pictureUrl = await getDownloadURL(storageRef);
      // const userInfo = { profilePicture: pictureUrl , 'lior'};
      // const response = await axios.put(`${localUrl}/user-setting`, userInfo);
      // setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const value = {
    image,
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
