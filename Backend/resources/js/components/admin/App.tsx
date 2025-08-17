import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";
import "./css/satoshi.css";
import "flatpickr/dist/flatpickr.min.css";
import { useSelector } from "react-redux";
import { ADMIN_ROLE } from "@/constants/role";
// import { ADMIN_ROLE } from "../../constants/role";


function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() =>{
        /**
         * send cookie to api and if user exits then update redux.
         *
         */
        function checkUser(){
            // axios.get(appendToBaseApiUrl("/check-auth"))


        }
        checkUser()
    },[])


    const user = useSelector((store:ReduxStore) => store.user.value);

    if (user?.role !== ADMIN_ROLE) {
        window.location.href= "/"
        return null;
        return <Navigate to={"/"} />;
    }



    return <DefaultLayout>
        <Outlet/>
    </DefaultLayout>;
}

export default App;
