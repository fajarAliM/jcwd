import { Box, Grid, Stack } from "@mui/material";
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";

const AdminPageContainer = ({ children }) => {
  return (
    <Stack>
      <AdminNavbar />
      <Grid container>
        <Grid item>
          <AdminSidebar />
        </Grid>
        <Grid
          xs={9}
          item
          sx={{
            background:
              "linear-gradient(155.7deg, #D6F5F3 -45.88%, #F7FCFC 45.77%, #F1F5FC 117.72%)",
            minHeight: "calc(100vh - 64px)",
            minWidth: "calc(100% - 256px)",
          }}
        >
          <Box
            sx={{
              paddingX: "48px",
              paddingY: "32px",
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AdminPageContainer;
