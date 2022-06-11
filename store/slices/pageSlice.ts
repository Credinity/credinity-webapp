import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface PageState {
  error: string;
  isRequestSuccess: boolean;
  isProcessing: boolean;
  isOpenPrivacyConterm: boolean;
}

const initialState: PageState = {
  error: "",
  isRequestSuccess: false,
  isProcessing: false,
  isOpenPrivacyConterm: false,
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
  },
});

//export action
export const {
  setRequestSuccess,
  setIsProcessing,
  setErrorMsg,
  setIsOpenPrivacyConterm,
} = pageSlice.actions;

// export selector
export const pageSelector = (store: RootState) => store.page;

export default pageSlice.reducer;
