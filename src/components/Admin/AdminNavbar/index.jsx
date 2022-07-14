import { Box, Drawer, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { logout } from "redux/reducer/auth";
import jsCookie from "js-cookie";
import Router from "next/router";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutBtnHandler = () => {
    dispatch(logout());

    jsCookie.remove("admin_auth_token");
    Router.push("/admin/login");
  };

  return (
    <Drawer
      sx={{ height: "64px" }}
      container="container"
      variant="permanent"
      anchor="top"
    >
      <Box
        sx={{
          paddingX: "48px",
          paddingY: "22px",
          display: "flex",
          justifyContent: "flex-end",
          color: "Brand.500",
        }}
      >
        <NotificationsIcon />
        <AccountCircleIcon onClick={handleClick} sx={{ marginLeft: "36px" }} />
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={logoutBtnHandler}>Keluar</MenuItem>
        </Menu>
      </Box>
    </Drawer>
  );
};

export default AdminNavbar;
