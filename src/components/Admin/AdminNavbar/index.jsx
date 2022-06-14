import { Box, Drawer } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminNavbar = () => {
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
        <AccountCircleIcon sx={{ marginLeft: "36px" }} />
      </Box>
    </Drawer>
  );
};

export default AdminNavbar;
