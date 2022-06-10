/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
import { Box, Collapse, Typography, MenuItem } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SubMenu from "../SubMenu";

const MainMenu = ({ title, iconTag, subMenus = [] }) => {
  const [menu, setMenu] = useState("");
  const [subMenu, setSubMenu] = useState("");
  const [expand, setExpand] = useState(false);
  const handleChange = (event, newMenu) => {
    setMenu(newMenu);
    setExpand(!expand);
  };

  return (
    <Box
      marginBottom={2}
      color={expand ? "Brand.500" : "Sidebar.500"}
      sx={{
        paddingX: "20px",
        paddingY: "30px",
        ":hover": {
          cursor: "pointer",
          color: "Brand.500",
        },
      }}
      height="80px"
      display="flex"
      flexDirection="column"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        marginBottom="14px"
        onClick={(e) => handleChange(e, `${title}`)}
      >
        <Box display="flex" flexDirection="row">
          {iconTag}
          <Typography marginLeft="12px">{title}</Typography>
        </Box>
        {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>
      <Collapse sx={{ marginLeft: "22px" }} in={expand}>
        {subMenus.map((val) => {
          return (
            <Link href={val.href}>
              <MenuItem
                onClick={() => setSubMenu(`${val.submenuTitle}`)}
                sx={{
                  marginBottom: "1px",
                  color:
                    subMenu === `${val.submenuTitle}`
                      ? "Brand.500"
                      : "Sidebar.500",
                  ":hover": {
                    cursor: "pointer",
                    borderColor: "Brand.500",
                    backgroundColor: "white",
                    color: "Brand.500",
                  },
                }}
              >
                {val.submenuTitle}
              </MenuItem>
            </Link>
          );
        })}
      </Collapse>
    </Box>
  );
};

export default MainMenu;
