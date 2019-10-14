import isEmpty from "../validations/is-empty";

import {SET_CURRENT_USER} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            let ret = {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: {
                    ...action.payload,
                    firstname: localStorage.firstname ? localStorage.firstname : action.payload.firstname,
                    lastname: localStorage.lastname ? localStorage.lastname : action.payload.lastname,
                    company: localStorage.company ? localStorage.company : action.payload.company,
                }
            };
            return ret;
        case "UPDATE_USER":
            let tempUser = {
                ...state.user,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                company: action.payload.company
            };

            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: tempUser
            };
        default:
            return state;
    }
}
