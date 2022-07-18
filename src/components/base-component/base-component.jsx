import React, { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AppBar, Drawer } from "../drawer/drawer";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/auth";
import HeaderMenu from "../header-menu/header-menu";
import { Outlet, useNavigate } from "react-router-dom";
import clientLogo from "../../assets/logo/logo-trans.png";
import Logo from "../../assets/app_logo/app_l.png";

const BaseComponent = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const [open, setOpen] = useState(true);

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: "flex" }} className={classess.appPage}>
            <CssBaseline />
            <AppBar position="fixed" open={open} className={classess.appPage__appbar}>
                <Toolbar sx={{ padding: { xs: '0 20px', sm: '0 20px', lg: '0 60px' } }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            ...(!localStorage.getItem("accessToken") && {
                                marginLeft: 100,
                            }),
                        }}
                    >
                        <div className={classess.appPage__appbar__l_contain}>
                            <h2>
                                <img src={clientLogo} className={classess.appPage__appbar__client_logo} alt="" />
                            </h2>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawer}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <HeaderMenu handleDrawerClose={handleDrawer} />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={open}
                className={classess.appPage__drawer}
                style={{
                    ...(!localStorage.getItem("accessToken") && {
                        display: "none",
                    }),
                }}
            >
                <List sx={{ marginLeft: 3 }}>
                    <ListItem
                        button
                        key={4}
                        onClick={() => {
                            navigation("/");
                        }}
                    >
                        <ListItemIcon>
                            <PowerSettingsNewIcon
                                sx={{ color: 'white' }}
                                className={classess.appPage__drawer__icon}
                            />
                        </ListItemIcon>
                        <ListItemText className={classess.appPage__drawer__text} primary={"Home"} />
                    </ListItem>
                    <ListItem
                        button
                        key={4}
                        onClick={() => {
                            navigation("/artist");
                        }}
                    >
                        <ListItemIcon>
                            <PowerSettingsNewIcon
                                sx={{ color: 'white' }}
                                className={classess.appPage__drawer__icon}
                            />
                        </ListItemIcon>
                        <ListItemText className={classess.appPage__drawer__text} primary={"My Artists"} />
                    </ListItem>
                    <ListItem
                        button
                        key={4}
                        onClick={() => {
                            navigation("/login");
                        }}
                    >
                        <ListItemIcon>
                            <PowerSettingsNewIcon
                                sx={{ color: 'white' }}
                                className={classess.appPage__drawer__icon}
                            />
                        </ListItemIcon>
                        <ListItemText className={classess.appPage__drawer__text} primary={"Help?"} />
                    </ListItem>
                    <ListItem
                        button
                        key={4}
                        onClick={() => {
                            handleDrawer();
                            dispatch(logout());
                            navigation("/login");
                        }}
                    >
                        <ListItemIcon>
                            <PowerSettingsNewIcon
                                sx={{ color: 'white' }}
                                className={classess.appPage__drawer__icon}
                            />
                        </ListItemIcon>
                        <ListItemText className={classess.appPage__drawer__text} primary={"Logout"} />
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="div" component="div">
                    <Outlet />
                </Typography>
            </Box>
            <Box
                style={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    color: "white",
                    textAlign: "center",
                    paddingBlock: "10px",
                    backgroundColor: "black",
                    margin: 0,
                    zIndex: 9999,
                }}
            >
                © 2022. All Rights Reserved
            </Box>
        </Box>
    );
};

export default BaseComponent;