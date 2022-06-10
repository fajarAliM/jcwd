import Link from "next/link";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/router";

const SubMenu = ({ submenuTitle, href }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <MenuItem
        sx={{
          marginBottom: "1px",
          color: router.pathname === `${href}` ? "Brand.500" : "Sidebar.500",
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
