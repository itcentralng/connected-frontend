/* eslint-disable react/prop-types */
import { AppBar as MuiAppBar } from "@mui/material/";
import Toolbar from "@mui/material/Toolbar";

const Appbar = ({ drawerWidth }) => {
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar></Toolbar>
    </MuiAppBar>
  );
};

export default Appbar;
