import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import NavigationComponent from "./NavigationComponent";
import { LinkContent } from "../contexts/LinkContext";
import Mainflow from "../components/mainflow/Mainflow";
import MainflowSidebar from "../components/mainflow/components/side-pannel/MainFlowSidebar";
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from 'react-router-dom';

const RouterComponent: React.FC<{ pageContext?: { layout: string } }> = ({
  pageContext,
}) => {
  const [open, setOpen] = useState(false);
  const { isUpdating, setIsUpdating } = useContext(LinkContent);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/mainflow');
  }, [navigate]);

  useEffect(() => {
    if ((isUpdating || isSidebarOpen) && !open) {
      setOpen(true);
      setIsSidebarOpen(true);
    }
  }, [isUpdating, open, isSidebarOpen]);

  const toggleDrawer = () => {
    setOpen(!open);
    setIsSidebarOpen(!isSidebarOpen);
    setIsUpdating(false);
  };
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      zIndex: 1001,
      width: 440,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
    "& .DrawerContent": {
      height: "calc(100vh - 64px)",
      overflow: "auto",
      paddingBottom: "100px",
    },
  }));

  const DrawerContent = () => {
    const location = useLocation();
    switch (location.pathname) {
      case "/mainflow":
        return <MainflowSidebar />;
      default:
        return <MainflowSidebar />;
    }
  };

  return (
    <div className="plm-app-router-container">
      <NavigationComponent isOpen={open} handleDrawer={toggleDrawer} />
      <div className="plm-app-router-content">
        {open && (
          <Drawer variant="permanent" open={open}>
            <div className="DrawerContent">
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  {open && <CloseIcon />}
                </IconButton>
              </Toolbar>
              <DrawerContent />
            </div>
          </Drawer>
        )}
          <Routes>
            <Route path="/mainflow" element={<Mainflow />} />
          </Routes>
      </div>
    </div>
  );
};

export default RouterComponent;
