import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Appbar from "./Appbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Layout() {
  const user = useSelector((state) => state.user.user);
  if (user === null) {
    return <Navigate to="/login" />;
  }
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <MainContent />
    </Box>
  );
}

export default Layout;
