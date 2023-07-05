import { configureStore, createSlice } from "@reduxjs/toolkit";
const userInitialState = {
  username: "",
  earned: 0,
  memberSince: "",
  latestWin: {},
  lotteryNumbers: [],
  bank: false,
  profilePicture: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    signIn(state, action) {
      state.username = action.payload.username;
      state.memberSince = action.payload.memberSince;
      state.lotteryNumbers = action.payload.lotteryNumbers;
      state.earned = action.payload.earned;
      state.latestWin = action.payload.latestWin;
      state.bank = action.payload.bank;
      state.profilePicture = action.payload.profilePicture;
    },
    addBank(state) {
      state.bank = true;
    },
    earnedMoney(state, action) {
      state.earned = action.payload.earned;
      state.latestWin = action.payload.latestWin;
    },
    addLotteryNumbers(state, action) {
      state.lotteryNumbers = action.payload;
    },
    logOut(state) {
      state.username = "";
      state.latestWin = {};
      state.bank = false;
      state.earned = 0;
      state.profilePicture = "";
      state.memberSince = "";
      state.lotteryNumbers = [];
    },
    addImg(state, action) {
      state.profilePicture = action.payload.profilePicture;
    },
  },
});
const allLotterySlice = createSlice({
  name: "allLottery",
  initialState: { allLottery: [], sortedLottery: {} },
  reducers: {
    addAllLottery(state, action) {
      state.allLottery = action.payload;
    },
    addSortedLottery(state, action) {
      state.sortedLottery = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    allLottery: allLotterySlice.reducer,
  },
});

export const userAction = userSlice.actions;
export const allLotteryAction = allLotterySlice.actions;
export default store;
