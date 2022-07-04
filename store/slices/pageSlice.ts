import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import {
  AuthorizedMenu,
  UnAuthorizedMenu,
} from "@/public/constants/menu.constant";

interface PageState {
  error: string;
  titlePage: string;
  detailPage: string;
  isRequestSuccess: boolean;
  isProcessing: boolean;
  isOpenPrivacyConterm: boolean;
  isContainTokenCookie: boolean;
  drawerMenuArray: Array<{ name: string; path: string }>;
}

const initialState: PageState = {
  error: "",
  titlePage: "",
  detailPage: "",
  isRequestSuccess: false,
  isProcessing: false,
  isOpenPrivacyConterm: false,
  isContainTokenCookie: false,
  drawerMenuArray: UnAuthorizedMenu,
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
      state.drawerMenuArray = state.isContainTokenCookie
        ? UnAuthorizedMenu
        : AuthorizedMenu;
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

export default pageSlice.reducer;
