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
import homeIcon from "../../assets/icons/Path 241.svg";
import artistIcon from "../../assets/icons/Group 460.svg";
import helpIcon from "../../assets/icons/Path 291.svg";
import logoutIcon from "../../assets/icons/Group 394.svg";

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
                    <Box className={classess.appPage__drawer__application_menu}>
                        <ListItem
                            button
                            key={1}
                            onClick={() => {
                                navigation("/");
                            }}
                            className={classess.appPage__drawer__listitem}
                        >
                            <ListItemIcon>
                                <img src={homeIcon} alt="" />
                            </ListItemIcon>
                            <label className={classess.appPage__drawer__text}>
                                Home
                            </label>
                        </ListItem>
                        <ListItem
                            button
                            key={2}
                            onClick={() => {
                                navigation("/artist");
                            }}
                            className={classess.appPage__drawer__listitem}
                        >
                            <ListItemIcon>
                                <img src={artistIcon} alt="" />
                            </ListItemIcon>
                            <label className={classess.appPage__drawer__text}>
                                My Artists
                            </label>
                        </ListItem>
                    </Box>


                    <Box className={classess.appPage__drawer__action_menu}>
                        <ListItem
                            button
                            key={3}
                            onClick={() => {
                                navigation("/login");
                            }}
                            className={classess.appPage__drawer__listitem}
                        >
                            <ListItemIcon>
                                <img src={helpIcon} alt="" />
                            </ListItemIcon>
                            <label className={classess.appPage__drawer__text}>
                                Help?
                            </label>
                        </ListItem>
                        <ListItem
                            button
                            key={4}
                            onClick={() => {
                                handleDrawer();
                                dispatch(logout());
                                navigation("/login");
                            }}
                            className={classess.appPage__drawer__listitem}
                        >
                            <ListItemIcon>
                                <img src={logoutIcon} alt="" />
                            </ListItemIcon>
                            <label className={classess.appPage__drawer__text}>
                                Logout
                            </label>
                        </ListItem>
                    </Box>
                </List>

                <div className={classess.appPage__drawer__footer_icon} style={{ display: open ? 'flex' : 'none' }}>
                    <img className={classess.appPage__drawer__footer_icon__image} src={Logo} alt="" />
                    <div className={classess.appPage__drawer__footer_icon__content}>
                        <span className={classess.appPage__drawer__footer_icon__content__small}>Powered by</span>
                        <span className={classess.appPage__drawer__footer_icon__content__big}>Black Lion</span>
                    </div>
                </div>
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