import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import * as mediaService from "@/services/mediaService";
import Router from "next/router";
import { imgB64toFormData } from "@/utils/commonUtil";

interface MediaState {
  error: string;
  imgB64: string;
  kycIdImgB64: string;
  mediaBlob?: Blob;
}

const initialState: MediaState = {
  error: "",
  imgB64: "",
  kycIdImgB64: "",
  mediaBlob: undefined,
};

export const uploadKycIdImageAsync = createAsyncThunk(
  "media/uploadKycIdImageAsync",
  async (reqImgB64: string) => {
    try {
      let formDataImg = await imgB64toFormData(reqImgB64, `KycIdImg`);
      const response = await mediaService.uploadKycIdImg(formDataImg);
      return response;
    } catch (error) {}
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
  },
  extraReducers: (builder) => {
    //Action เปลี่ยนแปลงค่าแบบ Asnyc
    //fullfilled = complete/ rejected/ pending = processing
    builder.addCase(uploadKycIdImageAsync.fulfilled, (state, action) => {
      var res = action.payload;
      if (res?.isSuccess) {
        Router.push("/ekyc/faceRecognitionIntro");
      } else if (res?.isSuccess == false) {
        var _msg = res?.errors[0]?.message ?? "";
        state.error = _msg;
      }
    });
  },
});

//export action
export const { setKycIdImgB64 } = mediaSlice.actions;

export const mediaSelector = (store: RootState) => store.media;

export default mediaSlice.reducer;
