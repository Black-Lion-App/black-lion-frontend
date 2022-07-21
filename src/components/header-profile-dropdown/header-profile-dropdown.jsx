import React, { useState } from 'react';
import classess from "./style.module.scss";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/auth';
import avatar1 from "../../assets/avatar/avatar2.jpeg";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const HeaderProfileDropDown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const user = useSelector((state) => state.auth.user);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }} className={classess.pageContainer}>
            <Tooltip title={`${user?.firstName} ${user?.lastName} Profile`}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, gap: 2 }}>
                    <Avatar sx={{ height: 60, width: 60, border: '1px solid white' }} alt={`${user?.firstName} ${user?.lastName}`} src={avatar1} />
                    <Box sx={{ display: { xs: 'none', sm: 'none', lg: 'flex' } }} className={classess.pageContainer__button_content}>
                        <div className={classess.pageContainer__button_content__user}>
                            <span className={classess.pageContainer__button_content__user__name}>{user?.firstName} {user?.lastName}</span>
                            <span className={classess.pageContainer__button_content__user__role}>Member Guest</span>
                        </div>
                        <KeyboardArrowDownIcon sx={{ color: '#2e8fa5' }} fontSize="medium" />
                    </Box>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key={1}>
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key={2} onClick={() => {
                    dispatch(
                        logout()
                    )
                    navigate('/logout')
                }}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default HeaderProfileDropDown