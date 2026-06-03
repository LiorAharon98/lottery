import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LotteryColumns {
  firstColumn: number[];
  secondColumn: number[];
}

interface UserState {
  username: string;
  earned: number;
  memberSince: string;
  latestWin: { number: number };
  lotteryNumbers: LotteryColumns;
  bank: boolean;
  profilePicture: string;
}

const userInitialState: UserState = {
  username: "",
  earned: 0,
  memberSince: "",
  latestWin: { number: 0 },
  lotteryNumbers: { firstColumn: [], secondColumn: [] },
  bank: false,
  profilePicture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    signIn(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    addBank(state) {
      state.bank = true;
    },
    earnedMoney(state, action: PayloadAction<{ earned: number; latestWin: { number: number } }>) {
      state.earned = action.payload.earned;
      state.latestWin = action.payload.latestWin;
    },
    addLotteryNumbers(state, action: PayloadAction<LotteryColumns>) {
      state.lotteryNumbers = action.payload;
    },
    logOut() {
      return userInitialState;
    },
    addImg(state, action: PayloadAction<{ profilePicture: string }>) {
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

interface AllLotteryState {
  allLottery: any[];
  sortedLottery: Record<string, any>;
}

const allLotterySlice = createSlice({
  name: "allLottery",
  initialState: { allLottery: [], sortedLottery: {} } as AllLotteryState,
  reducers: {
    addAllLottery(state, action: PayloadAction<any[]>) {
      state.allLottery = action.payload;
    },
    addSortedLottery(state, action: PayloadAction<Record<string, any>>) {
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

interface SelectedNumbersState {
  numbers: number[];
}

const selectedNumbersInitialState: SelectedNumbersState = {
  numbers: [],
};

const selectedNumbers = createSlice({
  name: "selectedNumbers",
  initialState: selectedNumbersInitialState,
  reducers: {
    addNumbers(state, action: PayloadAction<number>) {
      state.numbers.push(action.payload);
    },
    resetNumbers(state) {
      state.numbers = [];
    },
  },
});

interface SpecialNumberState {
  numbers: number[];
  specialNumber: { number: number; special: boolean };
}

const selectedSpecialNumber = createSlice({
  name: "selectedSpecialNumber",
  initialState: { numbers: [], specialNumber: { number: 0, special: false } } as SpecialNumberState,
  reducers: {
    addSpecialNumber(state, action: PayloadAction<number>) {
      state.specialNumber = { number: action.payload, special: true };
    },
    resetNumbers(state) {
      state.specialNumber = { number: 0, special: false };
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
