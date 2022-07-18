import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/auth';

const Dashboard = () => {
    const dispatch = useDispatch();
    const logoutApp = () => {
        dispatch(
            logout()
        )
    }
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard