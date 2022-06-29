// Implement from Redux toolkit
// Slices => Reducer + Action(ตัวเปลี่ยนแปลงค่า)
//เปลี่ยนแปลงค่า state/ เชื่อมต่อ server
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
//เอาทุก export ในไฟล์
import * as authService from "@/services/authPageApi";
import * as termsCondService from "@/services/termsCondPageApi";
import { SignUpFormProps, SignUpReq, SignUpRes } from "@/models/auth.model";
import {
  validateEmail,
  validatePassword,
} from "helpers/client/regexValidation";
import Router from "next/router";
import { Error as resError } from "@/models/base.model";

interface UserState {
  error: string;
  isRequestSuccess: boolean;
  isProcessing: boolean;
  isOtpProcessing: boolean;
  isDisableInput: boolean;
  isRedCheckBox: boolean;
  privacyVersion: string;
  privacyDetailHtml: string;
}

const initialState: UserState = {
  error: "",
  isRequestSuccess: false,
  isProcessing: false,
  isOtpProcessing: false,
  isDisableInput: false,
  isRedCheckBox: false,
  privacyVersion: "",
  privacyDetailHtml: "",
};

function SignUpValidation(values: SignUpFormProps): string {
  var result = "";
  if (!values.email) {
    result = "Email is required";
  } else if (!validateEmail(values.email)) {
    result = "Email is wrong format";
  } else if (!values.password) {
    result = "Password is required";
  } else if (!values.confirmPass) {
    result = "Confirm Password is required";
  } else if (values.password !== values.confirmPass) {
    result = "Mismatch password";
  } else if (!validatePassword.test(values.password)) {
    result = "Password is wrong format (min 8, max 24)";
  } else if (values.isAgreeCond == false) {
    result = "CheckboxFail";
  } else {
    result = "Correct";
  }
  return result;
}

//Async sign up
export const getPrivacyPolicyAsync = createAsyncThunk(
  "user/getPrivacyPolicy",
  async () => {
    const response = await termsCondService.getPrivacyPolicy();
    return response;
  }
);
export const signUpAsync = createAsyncThunk(
  "user/signup", //action label show on redux devtool
  async (values: SignUpFormProps) => {
    var _result = SignUpValidation(values);
    if (_result == "Correct") {
      //ยิงไป server
      const req: SignUpReq = {
        email: values.email,
        password: values.password,
        privacyPolicyVersion: values.privacyPolicyVersion,
      };
      const response = await authService.signUp(req);
      return response;
    } else {
      const error: resError = {
        message: _result,
      };
      var errors = new Array(error);
      const res: SignUpRes = {
        isSuccess: false,
        errors,
        successMessage: null,
        requestId: "",
      };
      return res;
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
      state.isProcessing = action.payload;
      state.isDisableInput = action.payload;
    },
    setOtpProcessing: (state, action: PayloadAction<boolean>) => {
      state.isOtpProcessing = action.payload;
      state.isDisableInput = action.payload;
    },
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Action เปลี่ยนแปลงค่าแบบ Asnyc
    //fullfilled = complete/ rejected/ pending = processing
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      // writeLog(
      //   `signUpAsync.fulfilled action payload => ${JSON.stringify(
      //     action.payload
      //   )}`
      // );
      var res = action.payload;
      if (res?.isSuccess) {
        state.isRequestSuccess = true;
        Router.push("/auth/signUpComplete");
        state.isRequestSuccess = false;
      } else if (res?.isSuccess == false) {
        var _msg = res?.errors[0]?.message ?? "";
        if (_msg == "CheckboxFail") {
          state.error = "";
          state.isRedCheckBox = true;
        } else {
          state.isRedCheckBox = false;
          state.error = _msg;
        }
      }
    });
    builder.addCase(getPrivacyPolicyAsync.fulfilled, (state, action) => {
      if (state.privacyVersion != "") return;
      // writeLog(
      //   `getPrivacyPolicyAsync.fulfilled action payload => ${JSON.stringify(
      //     action.payload
      //   )}`
      // );
      var res = action.payload;
      if (res?.isSuccess) {
        state.privacyVersion = res.version;
        //todo pop: Language change
        state.privacyDetailHtml = res.privacyPolicyTextTh;
      } else {
        var _msg = res?.errors[0]?.message ?? "";
        state.isRedCheckBox = false;
        state.error = _msg;
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
} = userSlice.actions;

// export selector
export const userSelector = (store: RootState) => store.user;

export default userSlice.reducer;
