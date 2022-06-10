import Link from "next/link";
import { MenuItem } from "@mui/material";

const SubMenu = ({ submenuTitle, href, isClick }) => {
  return (
    <Link href={href}>
      <MenuItem
        sx={{
          marginBottom: "1px",
          color:
            { isClick } === `${submenuTitle}` ? "Brand.500" : "Sidebar.500",
          ":hover": {
            cursor: "pointer",
            borderColor: "Brand.500",
            backgroundColor: "white",
            color: "Brand.500",
          },
        }}
      >
        {submenuTitle}
      </MenuItem>
    </Link>
  );
};

export default SubMenu;
