import * as api from "../api";
import { AUTH, FETCH, UPDATE } from "./ActionTypes";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history.push("../signedin");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();

    dispatch({ type: FETCH, payload: data });

    //    history.push("/");

  } catch (error) {
    console.log(error);
  }
};


export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);

    dispatch({ type: FETCH, payload: data });

    console.log("test")
  } catch (error) {
    console.log(error);
  }
}


export const AddExercise = (id, entry) => async (dispatch) => {
  try {
    console.log(id, entry)

    const { data } = await api.AddExercise(id, entry);

    console.log(data)
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const AddTarget = (id, exerciseId, entry) => async (dispatch) => {
  try {
    const { data } = await api.AddTarget(id, exerciseId, entry);


    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}


export const updateExercise = (id, exerciseId, entry) => async (dispatch) => {
  try {
    console.log(entry)

    const { data } = await api.UpdateExercise(id, exerciseId, entry);

    console.log(data)

    dispatch({ type: UPDATE, payload: data });

    console.log(data)
  } catch (error) {
    console.log(error);
  }
}