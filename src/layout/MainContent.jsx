import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainContent = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <Outlet />
    </Box>
  );
};

export default MainContent;
