import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, naviatge) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    naviatge("/");
  } catch (error) {
    console.log(error);
    alert("Wrong username or password");
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //console.log("form", formData);
    const { data } = await api.signUp(formData);
    //console.log("form", data);
    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
