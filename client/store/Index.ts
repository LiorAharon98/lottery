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
const toggleModal = createSlice({
  name: "modal",
  initialState: { toggle: false },
  reducers: {
    toggleOn(state) {
      state.toggle = true;
    },
    toggleOFF(state) {
      state.toggle = false;
    },
  },
});
const selectedNumbers = createSlice({
  name: "selectedNumbers",
  initialState: { numbers: [] },
  reducers: {
    addNumbers(state, action) {
      state.numbers.push(action.payload);
    },
    resetNumbers(state) {
      state.numbers = [];
    },
  },
});
const selectedSpecialNumber = createSlice({
  name: "selectedSpecialNumber",
  initialState: { numbers: [], specialNumber: {} },
  reducers: {
    addSpecialNumber(state, action) {
      state.specialNumber = { number: action.payload, special: true };
    },

    resetNumbers(state) {
      state.specialNumber = {};
    },
  },
});
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    allLottery: allLotterySlice.reducer,
    modal: toggleModal.reducer,
    selectedSpecialNumber: selectedSpecialNumber.reducer,
    selectedNumbers: selectedNumbers.reducer,
  },
});

export const userAction = userSlice.actions;
export const allLotteryAction = allLotterySlice.actions;
export const modalAction = toggleModal.actions;
export const selectedSpecialNumberAction = selectedSpecialNumber.actions;
export const selectedNumbersAction = selectedNumbers.actions;
export default store;
