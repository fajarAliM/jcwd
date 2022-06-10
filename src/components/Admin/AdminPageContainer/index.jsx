import { Box } from "@mui/material";
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";

const AdminPageContainer = ({ children }) => {
  return (
    <Box>
      <AdminNavbar />
      <AdminSidebar />
      <Box>{children}</Box>
    </Box>
  );
};

export default AdminPageContainer;
