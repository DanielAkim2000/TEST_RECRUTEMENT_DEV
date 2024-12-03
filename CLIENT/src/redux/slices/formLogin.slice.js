import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "login",
  isOpenFormLogin: false,
  firstname: "",
  name: "",
  email: "",
  password: "",
  newPassword: "",
  helperText: {
    email: "",
    password: "",
    name: "",
    firstname: "",
    newPassword: "",
  },
};

const formLoginSlice = createSlice({
  name: "formLogin",
  initialState,
  reducers: {
    setOpenFormLogin: (state, action) => {
      state.isOpenFormLogin = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setHelperText: (state, action) => {
      state.helperText = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstname = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
    handleClose: (state) => {
      state.isOpenFormLogin = false;
      state.email = "";
      state.password = "";
      state.helperText = {
        email: "",
        password: "",
        name: "",
        firstname: "",
        newPassword: "",
      };
      state.name = "";
      state.firstname = "";
      state.type = "login";
      state.newPassword = "";
    },
  },
});

export const {
  setOpenFormLogin,
  setEmail,
  setPassword,
  setHelperText,
  setName,
  setFirstName,
  setType,
  handleClose,
  setNewPassword,
} = formLoginSlice.actions;

export default formLoginSlice.reducer;

// Selectors
export const selectIsOpenFormLogin = (state) => state.formLogin.isOpenFormLogin;
export const selectEmail = (state) => state.formLogin.email;
export const selectPassword = (state) => state.formLogin.password;
export const selectHelperText = (state) => state.formLogin.helperText;
export const selectName = (state) => state.formLogin.name;
export const selectFirstName = (state) => state.formLogin.firstname;
export const selectType = (state) => state.formLogin.type;
export const selectNewPassword = (state) => state.formLogin.newPassword;
