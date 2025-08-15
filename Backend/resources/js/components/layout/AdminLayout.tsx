import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AdminApp from "../admin/App";
import "../admin/css/style.css";
import axios from "axios";
import appendToBaseApiUrl from "../../utils/appendToBaseApiUrl";
import { setReduxUser } from "../../redux/slices/userSlice";



export default function AdminLayout() {
    const dispatch = useDispatch()
    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     axios
    //         .get(appendToBaseApiUrl("/check-auth"), {
    //             headers: {
    //                 Authorization: "Bearer " + token,
    //             },
    //         })
    //         .then((res) => {
    //             dispatch(setReduxUser(res))
    //         })
    //         .catch((err) => {});
    // }, []);

    return <AdminApp />;
}
