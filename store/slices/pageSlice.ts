import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface UserState {
  error: string;
  isRequestSuccess: boolean;
  isProcessing: boolean;
}

const initialState: UserState = {
  error: "",
  isRequestSuccess: false,
  isProcessing: false,
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
  },
});

//export action
export const { setRequestSuccess, setIsProcessing, setErrorMsg } =
  pageSlice.actions;

// export selector
export const pageSelector = (store: RootState) => store.page;

export default pageSlice.reducer;
