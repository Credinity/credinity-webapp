import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface PageState {
  error: string;
  titlePage: string;
  detailPage: string;
  isRequestSuccess: boolean;
  isProcessing: boolean;
  isOpenPrivacyConterm: boolean;
  isContainTokenCookie: boolean;
}

const initialState: PageState = {
  error: "",
  titlePage: "",
  detailPage: "",
  isRequestSuccess: false,
  isProcessing: false,
  isOpenPrivacyConterm: false,
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
    setRequestSuccess: (state, action: PayloadAction<boolean>) => {
      state.isRequestSuccess = action.payload;
    },
    setIsProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setIsOpenPrivacyConterm: (state, action: PayloadAction<boolean>) => {
      state.isOpenPrivacyConterm = action.payload;
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
  setRequestSuccess,
  setIsProcessing,
  setIsOpenPrivacyConterm,
  setIsContainTokenCookie,
} = pageSlice.actions;

// export selector
export const pageSelector = (store: RootState) => store.page;
export const IsContainTokenCookieSelector = (store: RootState): boolean =>
  store.page.isContainTokenCookie;

export default pageSlice.reducer;
