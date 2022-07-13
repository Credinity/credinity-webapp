import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface PageState {
  error: string;
  titlePage: string;
  detailPage: string;
  isOpenAlert: boolean;
  isOpenDialog: boolean;
  isContainTokenCookie: boolean;
}

const initialState: PageState = {
  error: "",
  titlePage: "",
  detailPage: "",
  isOpenAlert: false,
  isOpenDialog: false,
  isContainTokenCookie: false,
};

const pageSlice = createSlice({
  name: "pageSlice",
  initialState: initialState,
  reducers: {
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setTitlePage: (state, action: PayloadAction<string>) => {
      state.titlePage = action.payload;
    },
    setDetailPage: (state, action: PayloadAction<string>) => {
      state.detailPage = action.payload;
    },
    setIsOpenAlert: (state, action: PayloadAction<boolean>) => {
      state.isOpenAlert = action.payload;
    },
    setIsOpenDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenDialog = action.payload;
    },
    setIsContainTokenCookie: (state, action: PayloadAction<boolean>) => {
      state.isContainTokenCookie = action.payload;
    },
  },
});

//export action
export const {
  setErrorMsg,
  setTitlePage,
  setDetailPage,
  setIsOpenAlert,
  setIsOpenDialog,
  setIsContainTokenCookie,
} = pageSlice.actions;

// export selector
export const pageSelector = (store: RootState) => store.page;

export default pageSlice.reducer;
