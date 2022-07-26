import * as mediaService from "@/services/mediaService";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";

interface MediaState {
  error: string;
  kycIdImgB64: string;
  selfieImgb64: string;
  isRearCameraActive: boolean;
}

const initialState: MediaState = {
  error: "",
  kycIdImgB64: "",
  selfieImgb64: "",
  isRearCameraActive: false,
};

export const uploadIdKycImgAsync = createAsyncThunk(
  "media/uploadIdKycImgAsync ",
  async (reqImgB64: string) => {
    const response = await mediaService.uploadImgFormData(
      { base64Data: reqImgB64, fileName: "KycIdImg" },
      "/media/uploadKycIdImg"
    );
    return response;
  }
);
export const uploadPortraitEkycImgAsync = createAsyncThunk(
  "media/uploadPortraitEkycImgAsync ",
  async (reqImgB64: string) => {
    // let formDataImg = await imgB64toFormData(reqImgB64, `SelfieImg`);
    const response = await mediaService.uploadImgFormData(
      { base64Data: reqImgB64, fileName: "SelfieImg" },
      "/media/uploadPortraitImg"
    );
    return response;
  }
);
export const rearCameraChecking = createAsyncThunk(
  "media/rearCameraChecking",
  async (stream: MediaStream) => {
    let isRearCameraActive = false;
    try {
      let devices = await navigator.mediaDevices.enumerateDevices();
      devices.filter((device) => {
        if (device.kind === "videoinput") {
          if (device.label && device.label.length > 0) {
            if (device.label.toLowerCase().indexOf("back") >= 0) {
              isRearCameraActive = true;
            } else if (device.label.toLowerCase().indexOf("front") >= 0) {
              //result.hasFront = true;
            } else {
              /* some other device label ... desktop browser? */
              // result.hasFront = true;
            }
          }
          return true;
        }
        return false;
      });
      /* drop stream */
      const tracks = stream.getTracks();
      if (tracks) {
        for (let t = 0; t < tracks.length; t++) tracks[t].stop();
      }
      return isRearCameraActive;
    } catch (ex) {
      return isRearCameraActive;
    }
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState: initialState,
  reducers: {
    //เปลี่ยนแปลงค่า
    setKycIdImgB64: (state, action: PayloadAction<string>) => {
      state.kycIdImgB64 = action.payload;
    },
    setSelfieImgb64: (state, action: PayloadAction<string>) => {
      state.selfieImgb64 = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Action เปลี่ยนแปลงค่าแบบ Asnyc
    //fullfilled = complete/ rejected/ pending = processing
    builder.addCase(uploadIdKycImgAsync.fulfilled, (state, action) => {
      var res = action.payload;
      if (res?.isSuccess) {
        Router.push("/ekyc/faceRecognitionIntro");
      } else if (res?.isSuccess == false) {
        var _msg = res?.errors[0]?.message ?? "";
        state.error = _msg;
      }
    });

    builder.addCase(uploadPortraitEkycImgAsync.fulfilled, (state, action) => {
      var res = action.payload;
      if (res?.isSuccess) {
        Router.push("/ekyc/infoForm");
      } else if (res?.isSuccess == false) {
        var _msg = res?.errors[0]?.message ?? "";
        state.error = _msg;
      }
    });

    builder.addCase(rearCameraChecking.fulfilled, (state, action) => {
      state.isRearCameraActive = action.payload;
    });

    builder.addCase(rearCameraChecking.rejected, (state, action) => {
      state.isRearCameraActive = false;
    });
  },
});

//export action
export const { setKycIdImgB64, setSelfieImgb64 } = mediaSlice.actions;

export const mediaSelector = (store: RootState) => store.media;

export default mediaSlice.reducer;
