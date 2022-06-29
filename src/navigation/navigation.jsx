

import React, { useEffect } from 'react';
import NotFound from "../components/notfound/notfound";
import { me } from "../redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from '../containers/dashboard/dashboard';
import LoginContainer from '../containers/login/login';

const Navigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            dispatch(me());
        }
    }, []);
    
    useEffect(() => {
         if (user) {
            navigate('/dashboard')
        } else {
            navigate('/login')
        }
    }, [user]);

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route index path="/login" element={<LoginContainer />} />
            <Route element={<NotFound />} />
        </Routes>
    )
}

export default Navigation


// {
//     user ? (
//         <>
//             <Route path="/" element={<Dashboard />} />

//             {/* auths */}
//             <Route path="/login" element={<LoginContainer />} />
//             <Route component={NotFound} />
//         </>
//     ) : (
//         <>
//             <Route path="/login" element={<LoginContainer />} />
//             <Route component={<NotFound />} />
//         </>
//     )}