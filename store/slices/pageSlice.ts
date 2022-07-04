import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import {
  AuthorizedMenu,
  UnAuthorizedMenu,
} from "@/public/constants/menu.constant";

interface PageState {
  error: string;
  isRequestSuccess: boolean;
  isProcessing: boolean;
  isOpenPrivacyConterm: boolean;
  isContainTokenCookie: boolean;
  drawerMenuArray: Array<{ name: string; path: string }>;
}

const initialState: PageState = {
  error: "",
  isRequestSuccess: false,
  isProcessing: false,
  isOpenPrivacyConterm: false,
  isContainTokenCookie: false,
  drawerMenuArray: [],
};

const pageSlice = createSlice({
  name: "pageSlice",
  initialState: initialState,
  reducers: {
    setRequestSuccess: (state, action: PayloadAction<boolean>) => {
      state.isRequestSuccess = action.payload;
    },
    setIsProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setIsOpenPrivacyConterm: (state, action: PayloadAction<boolean>) => {
      state.isOpenPrivacyConterm = action.payload;
    },
    setIsContainTokenCookie: (state, action: PayloadAction<boolean>) => {
      state.isContainTokenCookie = action.payload;
      state.drawerMenuArray = state.isContainTokenCookie
        ? UnAuthorizedMenu
        : AuthorizedMenu;
    },
  },
});

//export action
export const {
  setRequestSuccess,
  setIsProcessing,
  setErrorMsg,
  setIsOpenPrivacyConterm,
  setIsContainTokenCookie,
} = pageSlice.actions;

// export selector
export const pageSelector = (store: RootState) => store.page;

export default pageSlice.reducer;
