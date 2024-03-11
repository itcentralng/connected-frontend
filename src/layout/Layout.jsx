import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Appbar from "./Appbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Layout() {
  const { isAuth } = useSelector((state) => state.user);
  if (!isAuth) {
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
