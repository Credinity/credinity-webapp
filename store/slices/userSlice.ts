// Implement from Redux toolkit
// Slices => Reducer + Action(ตัวเปลี่ยนแปลงค่า)
//เปลี่ยนแปลงค่า state/ เชื่อมต่อ server
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
//เอาทุก export ในไฟล์
import * as serverService from "@/services/authService";
import { SignUpFormProps, SignUpReq } from "@/models/auth.model";
import { validEmail, validPassword } from "helpers/client/regexValidation";
import writeLog from "@/utils/logUtils";
import Router from "next/router";

interface UserState {
  error: string;
  isRequestSuccess: boolean;
  isSignUpProcessing: boolean;
  isOtpProcessing: boolean;
  isDisableInput: boolean;
  isFormCorrect: boolean;
  isRedCheckBox: boolean;
}

const initialState: UserState = {
  error: "",
  isRequestSuccess: false,
  isSignUpProcessing: false,
  isOtpProcessing: false,
  isDisableInput: false,
  isFormCorrect: false,
  isRedCheckBox: false,
};

function SignUpValidation(values: SignUpFormProps, state?: UserState): boolean {
  if (!values.email) {
    if (state != undefined) state.error = "Email is required";
    return false;
  }
  if (!validEmail.test(values.email)) {
    if (state != undefined) state.error = "Email is wrong format";
    return false;
  }
  if (!values.password) {
    if (state != undefined) state.error = "Password is required";
    return false;
  }
  if (!values.confirmPass) {
    if (state != undefined) state.error = "Confirm Password is required";
    return false;
  }
  if (values.password !== values.confirmPass) {
    if (state != undefined) state.error = "Mismatch password";
    return false;
  }
  if (!validPassword.test(values.password)) {
    if (state != undefined)
      state.error = "Password is wrong format (min 8, max 24)";
    return false;
  }
  if (values.isAgreeCond == false) {
    if (state != undefined) state.error = "";
    if (state != undefined) state.isRedCheckBox = true;
    return false;
  } else {
    if (state != undefined) state.isRedCheckBox = false;
  }
  if (state != undefined) state.error = "";
  return true;
}

//Async sign up
export const signUpAsync = createAsyncThunk(
  "user/signup", //action label show on redux devtool
  async (values: SignUpFormProps) => {
    if (SignUpValidation(values, undefined)) {
      //ยิงไป server
      const req: SignUpReq = {
        email: values.email,
        password: values.password,
      };
      const response = await serverService.signUp(req);
      return response;
    } else {
      return null;
    }
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
      state.isFormCorrect = SignUpValidation(action.payload, state);
    },
  },
  extraReducers: (builder) => {
    //Action เปลี่ยนแปลงค่าแบบ Asnyc
    //fullfilled = complete/ rejected/ pending = processing
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      writeLog(
        `signUpAsync.fulfilled action payload => ${JSON.stringify(
          action.payload
        )}`
      );
      var res = action.payload;
      if (res?.isSuccess) {
        Router.push("/auth/verifyemail");
      } else if (res?.isSuccess == false) {
        state.error = res?.errors[0]?.message ?? "";
      }
    });
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
