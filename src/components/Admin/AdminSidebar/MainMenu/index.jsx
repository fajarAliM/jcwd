import { Box, Collapse, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SubMenu from "../SubMenu";

const MainMenu = ({ title, iconTag, subMenus = [] }) => {
  const [expand, setExpand] = useState(false);

  const handleChange = () => {
    setExpand(!expand);
  };

  return (
    <Box marginBottom={2}>
      <Box
        sx={{
          ":hover": {
            cursor: "pointer",
            color: "Brand.500",
          },
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "14px",
          // paddingX: "20px",
          paddingY: 1,
          color: expand ? "Brand.500" : "Sidebar.500",
        }}
        onClick={handleChange}
      >
        <Box display="flex" flexDirection="row">
          {iconTag}
          <Typography fontWeight="bold" marginLeft="12px">
            {title}
          </Typography>
        </Box>
        {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>
      <Collapse in={expand}>
        {subMenus.map((val) => {
          return <SubMenu submenuTitle={val.submenuTitle} href={val.href} />;
        })}
      </Collapse>
    </Box>
  );
};

export default MainMenu;
