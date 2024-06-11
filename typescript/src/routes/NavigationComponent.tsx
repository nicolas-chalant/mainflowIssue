import React from "react";
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton";

interface Props {
  isOpen: boolean;
  pageContext?: { layout: string };
  handleDrawer: () => void;
  
}

const NavigationComponent: React.FC<Props> = ({ isOpen,handleDrawer, }) => {

  return (
    <div>
      <ul className="plm-app-router-list">
        <li className="plm-app-router-list-item">
          <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              sx={{
                ...(isOpen && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </li>    
      </ul>
    </div>
  );
};
export default NavigationComponent;
