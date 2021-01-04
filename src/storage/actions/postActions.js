import { FETCH_VIDEOS, FETCH_PROFILE } from "./types";
import axios from "axios";

export const fetchVideos = () => (dispatch) => {
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_END}/content`,
  })
    .then((res) => res.data)
    .then((videos) =>
      dispatch({
        type: FETCH_VIDEOS,
        payload: videos,
      })
    );
};
export const fetchProfile = () => (dispatch) => {
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_END}/businesses/profile`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  })
    .then((res) => res.data)
    .then((profile) => {
      return dispatch({
        type: FETCH_PROFILE,
        payload: profile,
      });
    });
};
