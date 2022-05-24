// Implement from Redux toolkit
// Slices => Reducer + Action(ตัวเปลี่ยนแปลงค่า)
//เปลี่ยนแปลงค่า state/ เชื่อมต่อ server
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
//เอาทุก export ในไฟล์
import * as serverService from "@/services/authService";
import { SignUpFormProps, SignUpReq } from "@/models/auth.model";
import { validEmail, validPassword } from "helpers/client/regexValidation";

interface UserState {
  error: string;
  isRequestSuccess: boolean;
  isSignUpProcessing: boolean;
  isOtpProcessing: boolean;
  isDisableInput: boolean;
  isSignUpFormCorrect: boolean;
  isRedCheckBox: boolean;
}

const initialState: UserState = {
  error: "",
  isRequestSuccess: false,
  isSignUpProcessing: false,
  isOtpProcessing: false,
  isDisableInput: false,
  isSignUpFormCorrect: false,
  isRedCheckBox: false,
};

function SignUpValidation(state: UserState, values: SignUpFormProps) {
  state.error = "";
  if (!values.email) {
    state.error = "Email is required";
    return false;
  }
  if (!validEmail.test(values.email)) {
    state.error = "Email is wrong format";
    return false;
  }
  if (values.password !== values.confirmPass) {
    state.error = "Mismatch password";
    return false;
  }
  if (!validPassword.test(values.password)) {
    state.error = "Password is wrong format (min 8, max 24)";
    return false;
  }
  if (values.isAgreeCond == false) {
    state.isRedCheckBox = true;
    return false;
  } else {
    state.isRedCheckBox = false;
  }
  return true;
}

//Async sign up
export const signUpAsync = createAsyncThunk(
  "user/signup", //action label show on redux devtool
  async (req: SignUpReq) => {
    //ยิงไป server
    const response = await serverService.signUp(req);
    return response;
    //mock
    // const p1 = new Promise((res) =>
    //   setTimeout(() => res({ result: "signup success" }), 1000)
    // );
    // return await p1;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    //เปลี่ยนแปลงค่า
    setRequestSuccess: (state, action: PayloadAction<boolean>) => {
      state.isRequestSuccess = action.payload;
    },
    setSignUpProcessing: (state, action: PayloadAction<boolean>) => {
      state.isSignUpProcessing = action.payload;
      state.isDisableInput = action.payload;
    },
    setOtpProcessing: (state, action: PayloadAction<boolean>) => {
      state.isOtpProcessing = action.payload;
      state.isDisableInput = action.payload;
    },
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    validateSignUp: (state, action: PayloadAction<SignUpFormProps>) => {
      state.isSignUpFormCorrect = SignUpValidation(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    //Action เปลี่ยนแปลงค่าแบบ Asnyc
    //fullfilled = complete/ rejected/ pending = processing
    builder.addCase(signUpAsync.fulfilled, (state, action) => {});
  },
});

//export action
export const {
  setRequestSuccess,
  setSignUpProcessing,
  setOtpProcessing,
  setErrorMsg,
  validateSignUp,
} = userSlice.actions;

// export selector
export const userSelector = (store: RootState) => store.user;

export default userSlice.reducer;
