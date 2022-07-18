

import React, { useEffect } from 'react';
import NotFound from "../components/notfound/notfound";
import { me } from "../redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from '../containers/dashboard/dashboard';
import LoginContainer from '../containers/login/login';
import BaseComponent from '../components/base-component/base-component';

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
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [user]);

    return (
        <Routes>
            <Route path="/blig" element={<BaseComponent />}>
                <Route index path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/login" element={<LoginContainer />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/blig/dashboard" replace />} />
            <Route path="/blig" element={<Navigate to="/blig/dashboard" replace />} />
        </Routes>
    )
}

export default Navigation
