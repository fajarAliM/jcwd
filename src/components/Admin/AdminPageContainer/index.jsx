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
              "linear-gradient(155.7deg, #fce9d9 -45.88%, #ffede0 45.77%, #faf0e8 117.72%)",
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
