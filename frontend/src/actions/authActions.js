import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {toast} from "react-toastify";
//register

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/register", userData)
        .then(res =>
            toast.success(
                "User Registered Successfully, now login again to continue.",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: false,
                    hideProgressBar: true
                }
            )
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const updateUser = (userData, history) => (dispatch) => {
    axios
        .post("/update", userData)
        .then(res => {
                toast.success(
                    "Your profile has been updated.",
                    {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: false,
                        hideProgressBar: true
                    }
                );
                localStorage.setItem("firstname", userData.firstname);
                localStorage.setItem("lastname", userData.lastname);
                localStorage.setItem("company", userData.company);
                dispatch({
                    type: 'UPDATE_USER',
                    payload: {firstname: userData.firstname, lastname: userData.lastname, company: userData.company}
                });
            }
        )
        .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
        .post("/login", userData)
        .then(res => {
            // Save to localStorage
            const {token} = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            localStorage.setItem("firstname", decoded.firstname);
            localStorage.setItem("lastname", decoded.lastname);
            localStorage.setItem("company", decoded.company);

            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("company");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
