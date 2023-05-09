import { ReactNode } from "react";
import { GestureResponderEvent } from "react-native";
export interface lotteryType {
  number: number;
  special: boolean;
}
export interface propsCreateUserLottery {
  selectedNumbers: { number: number; special: boolean }[];
  selectedSpecialNum: { number: number; special: boolean };
  userLotteryNumArr: { number: number; special: boolean }[][];
  pressHandler: () => void;
  onSelectNumbers: (e: number) => void;
  onSelectedSpecialNumber: (e: number) => void;
}
export interface createdNumbers {
  numbers: number[];
  specialNum: number[];
}
export interface currentLottery {
  lotteryNumbers: { number: number; special: boolean }[];
  lotteryDate: string;
}
export interface props {
  children: ReactNode;
}

export interface userType {
  username: string;
  password: string;
  pictureUrl: string;
  earned: number;
  latestWin: { number: number; date: string };
}
export interface props {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  width?: number;
}
export interface card {
  height?: boolean;
  children: ReactNode;
}
export interface inputProps {
  label: string;
  onChange: (e: string) => void;
  color?: string;
}
export interface columType {
  cnt: number;
  prize: number;
  special: boolean;
}
export interface modalLotteryProps {
  countGuessAndPrizes: { firstColumn: columType; secondColumn: columType };
  closeModal: (e: GestureResponderEvent) => void;
  activateModal: boolean;
}
export interface foundsNumbersType {
  foundCnt: number;
  foundNumbers: { number: number; special: boolean }[];
}
