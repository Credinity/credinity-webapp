// Implement from Redux toolkit
// Slices => Reducer + Action(ตัวเปลี่ยนแปลงค่า)
//เปลี่ยนแปลงค่า state/ เชื่อมต่อ server
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
//เอาทุก export ในไฟล์
import * as userService from "@/services/userService";
import * as termsCondService from "@/services/termsCondService";
import {
  EkycFormReq,
  SignUpFormProps,
  SignUpReq,
  SignUpRes,
  UserProfileReq,
} from "@/models/user.model";
import {
  LaserIDReg,
  EmailReg,
  PasswordReg,
  NameReg,
  PhoneNoReg,
} from "helpers/client/regexValidation";
import Router from "next/router";
import { BaseApiResponse, Error as resError } from "@/models/base.model";
import {
  calculateAge,
  mapErrorListToStringArr,
  validNationalID,
} from "@/utils/commonUtil";

interface UserState {
  error: string;
  errorList?: Array<string | undefined>;
  isRequestSuccess: boolean;
  isProcessing: boolean;
  isOtpProcessing: boolean;
  isDisableInput: boolean;
  isRedCheckBox: boolean;
  privacyVersion: string;
  privacyDetailHtml: string;
  ekycStatus?: number;
}

const initialState: UserState = {
  error: "",
  errorList: undefined,
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
  } else if (!EmailReg(values.email)) {
    result = "Email is wrong format";
  } else if (!values.password) {
    result = "Password is required";
  } else if (!values.confirmPass) {
    result = "Confirm Password is required";
  } else if (values.password !== values.confirmPass) {
    result = "Mismatch password";
  } else if (!PasswordReg(values.password)) {
    result = "Password is wrong format (min 8, max 24)";
  } else if (values.isAgreeCond == false) {
    result = "CheckboxFail";
  } else {
    result = "Correct";
  }
  return result;
}

function KycFormValidation(values: EkycFormReq): string[] {
  let isRequiredInvalid = false;
  var result = [];

  if (!isRequiredInvalid && !values.username) {
    isRequiredInvalid = true;
  } else {
    if (!NameReg(values.username)) {
      result.push("Username incorrect format");
    }
  }

  if (!isRequiredInvalid && !values.fullName) {
    isRequiredInvalid = true;
  } else {
    if (!NameReg(values.fullName)) {
      result.push("Full name incorrect format");
    }
  }
  if (!isRequiredInvalid && !values.idNo) {
    isRequiredInvalid = true;
  } else {
    let _checkSt = values.idNo.replace(/[^\d]/g, "");
    if (!validNationalID(_checkSt)) {
      result.push("ตัวเลขบัตรประชาไม่ถูกต้อง");
    }
  }

  if (!isRequiredInvalid && !values.phoneNumber) {
    isRequiredInvalid = true;
  } else {
    let checkSt = values.phoneNumber.replace(/[^\d]/g, "");
    if (!PhoneNoReg(checkSt)) {
      result.push("เบอร์โทรศัพท์ไม่ถูกต้อง");
    }
  }

  if (!isRequiredInvalid && !values.laserId) {
    isRequiredInvalid = true;
  } else {
    if (!LaserIDReg(values.laserId)) {
      result.push("laser ID incorrect format");
    }
  }

  //calculateAge
  if (!isRequiredInvalid && !values.birthDate) {
    isRequiredInvalid = true;
  } else {
    let age = calculateAge(values.birthDate);
    if (age < 21) {
      result.push("ขออภัย คุณอายุไม่ถึงเกณฑ์ที่กำหนด");
    }
  }

  //check required
  if (!isRequiredInvalid) {
    if (!values.address) {
      isRequiredInvalid = true;
    } else if (!values.ethnicity) {
      isRequiredInvalid = true;
    } else if (!values.nationality) {
      isRequiredInvalid = true;
    }
  }

  if (isRequiredInvalid) {
    result.push("คุณยังกรอกข้อมูลไม่ครบ");
  }

  if (result.length == 0) {
    result.push("Correct");
  }
  return result;
}

//Async
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
      const response = await userService.signUp(req);
      return response;
    } else {
      const error: resError = {
        message: _result,
      };
      var errors = new Array(error);
      const res: SignUpRes = {
        isSuccess: false,
        errors,
        successMessage: "",
        requestId: "",
      };
      return res;
    }
  }
);

export const getProfileAsync = createAsyncThunk(
  "user/profile", //action label show on redux devtool
  async (req: UserProfileReq) => {
    const response = await userService.getProfile(req);
    return response;
  }
);

export const submitKycFormAsync = createAsyncThunk(
  "user/submitKycForm",
  async (values: EkycFormReq) => {
    var _result = KycFormValidation(values);
    if (_result[0] == "Correct") {
      let req = { ...values };
      req.idNo = req.idNo.replace(/[^\d]/g, "");
      req.phoneNumber = req.phoneNumber.replace(/[^\d]/g, "");
      //ยิงไป server
      const response = await userService.submitKycForm(req);
      return response;
    } else {
      var errors = _result.map((msg) => {
        const error: resError = {
          message: msg,
        };
        return error;
      });
      const res: BaseApiResponse = {
        isSuccess: false,
        errors,
        successMessage: "",
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
    builder.addCase(getProfileAsync.fulfilled, (state, action) => {
      var res = action.payload;
      if (res?.isSuccess) {
        state.ekycStatus = res.user.kycStatus;
      } else if (res?.isSuccess == false) {
        var _msg = res?.errors[0]?.message ?? "";
        state.error = _msg;
      }
    });
    builder.addCase(submitKycFormAsync.fulfilled, (state, action) => {
      var res = action.payload;
      if (res?.isSuccess) {
        Router.push("/status/waitingStatus");
      } else if (res?.isSuccess == false) {
        let errors = mapErrorListToStringArr(res?.errors);
        if (errors) {
          state.errorList = errors;
        }
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
