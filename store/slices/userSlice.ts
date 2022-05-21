// Implement from Redux toolkit
// Slices => Reducer + Action(ตัวเปลี่ยนแปลงค่า)
//เปลี่ยนแปลงค่า state/ เชื่อมต่อ server
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
//เอาทุก export ในไฟล์
import * as serverService from "@/services/authService";
import { SignUpReq } from "@/models/auth.model";

// interface SingleProp {
//   data: string;
// }

interface UserState {
  email: string;
  code: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

const initialState: UserState = {
  email: "",
  code: "",
  isAuthenticated: false,
  isAuthenticating: true,
};

//Async sign up
export const signUpAsync = createAsyncThunk(
  "user/signup", //action label show on redux devtool
  async (credential: SignUpReq) => {
    //ยิงไป server
    const response = await serverService.signUp(credential);
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
    // resetUsername: (state, action: PayloadAction<SingleProp>) => {
    //   state.username = action.payload.data;
    // },
  },
  extraReducers: (builder) => {
    //Action เปลี่ยนแปลงค่าแบบ Asnyc
    //fullfilled = complete/ rejected/ pending = processing

    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      state.code = action.payload.token;
    });
  },
});

//export resetUsername
// export const { resetUsername } = userSlice.actions;

// export common user selector
export const userSelector = (store: RootState) => store.user;
export const isAuthenticatedSelector = (store: RootState): boolean =>
  store.user.isAuthenticated;

export default userSlice.reducer;
