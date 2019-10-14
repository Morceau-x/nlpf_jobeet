import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import { toast } from "react-toastify";

export const editCompany = (companyData) => {
    axios
        .post("/company/edit", companyData)
        .then(res => {
                toast.success(
                    "The company has been updated.",
                    {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: false,
                        hideProgressBar: true
                    }
                );
            }
        )
        .catch(err => {
                console.log(err);
            }
        );
};