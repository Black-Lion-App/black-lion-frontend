import React, { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { AppBar, Drawer } from "../drawer/drawer";
import { useDispatch } from "react-redux";
import HeaderMenu from "../header-menu/header-menu";
import { Outlet, useNavigate } from "react-router-dom";
import clientLogo from "../../assets/logo/logo-trans.png";
import Logo from "../../assets/app_logo/app_l.png";
import barsIcon from "../../assets/icons/bars.svg"
import DrawerItems from "../drawer-items/drawer-items";

const BaseComponent = () => {
    const [open, setOpen] = useState(true);

    const handleDrawer = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        function handleResize() {
            console.log(window.innerWidth, window.innerWidth === 1000);
            if (window.innerWidth <= 1000) {
                setOpen(false);
            }
            if (window.innerWidth > 1000) {
                setOpen(true);
            }
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    return (
        <Box sx={{ display: "flex" }} className={classess.appPage}>
            <CssBaseline />
            <AppBar position="fixed" open={open} className={classess.appPage__appbar}>
                <Toolbar sx={{ padding: { xs: '0 20px', sm: '0 20px', lg: '0 60px' } }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        className={classess.appPage__appbar__toolContainer}
                    >
                        <div className={classess.appPage__appbar__l_contain}>
                            <h2>
                                <img src={clientLogo} className={classess.appPage__appbar__client_logo} alt="venture logo" />
                            </h2>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawer}
                                edge="start"
                                sx={{ display: { xs: 'none', sm: 'none', lg: 'block' } }}
                            >
                                <img src={barsIcon} alt="bars icons" />
                            </IconButton>
                        </div>
                        <HeaderMenu />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} className={classess.appPage__drawer}>
                <DrawerItems />
                <div className={classess.appPage__drawer__footer_icon} style={{ display: open ? 'flex' : 'none' }}>
                    <img className={classess.appPage__drawer__footer_icon__image} src={Logo} alt="logo" />
                    <div className={classess.appPage__drawer__footer_icon__content}>
                        <span className={classess.appPage__drawer__footer_icon__content__small}>Powered by</span>
                        <span className={classess.appPage__drawer__footer_icon__content__big}>Black Lion</span>
                    </div>
                </div>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, mt: 15 }}>
                <Typography variant="div" component="div">
                    <Outlet />
                </Typography>
            </Box>
            <Box className={classess.appPage__footer}>
                © {new Date().getFullYear()}. Black Lion. All rights reserved.
            </Box>
        </Box>
    );
};

export default BaseComponent;