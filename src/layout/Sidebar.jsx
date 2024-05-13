/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import {
  MessageSharp,
  ViewList,
  FileUpload,
  ExitToApp,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user.slice";

const Sidebar = ({ drawerWidth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    {
      icon: <FileUpload />,
      text: "Add File",
      link: "/addfile",
    },
    {
      icon: <MessageSharp />,
      text: "New Message",
      link: "createmessage",
    },
    {
      icon: <ViewList />,
      text: "Messages",
      link: "messages",
    },
    {
      icon: <ViewList />,
      text: "Files",
      link: "files",
    },
  ];

  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate("/login");
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography
          color="primary.main"
          sx={{
            fontWeight: "bold",
            letterSpacing: "4px",
            fontSize: 18,
            fontFamily: "monospace",
            textAlign: "center",
          }}
        >
          ConnectED
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems?.map((item, index) => (
          <ListItem key={index} disablePadding>
            <NavLink
              to={item.text === "Dashboard" ? "/" : `${item.link}`}
              end
              style={({ isActive }) => ({
                width: "100%",
                backgroundColor: isActive ? "#d1d1d1" : "",
              })}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      {/* Logout Button */}
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Drawer>
  );
};

export default Sidebar;
