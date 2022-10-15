import React, { useContext, useState } from "react";
import "./navBar.css";
import { Link, useNavigate } from "react-router-dom";
import DrawerComp from "../DrawerComp/DrawerComp";
import {
  AppBar,
  Button,
  CssBaseline,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  InputBase,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AuthContext from "../../Context/AuthContext";
import AppContext from "../../Context/AppContext";

function NavBar() {
  const [value, setValue] = useState();
  const { user, logoutUser } = useContext(AuthContext);
  const { searchBlogs } = useContext(AppContext);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [searchKey, setSearchKey] = useState();

  let handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  let searchBlogsValidation = (e) => {
    e.preventDefault();
    if (e.target.search_key.value === "") {
      return false;
    } else {
      searchBlogs(searchKey);
    }
  };
  let navigate = useNavigate();
  const userPages = [
    { name: "Write", path: "/write" },
    { name: "About Us", path: "/" },
    { name: "Python Compiler", path: "/python-compiler" },
  ];
  const authorPages = [
    { name: "Write", path: "/write" },
    { name: "Profile", path: `/author/profile/${user && user.user_id}/` },
    { name: "Python Compiler", path: "/python-compiler" },
  ];
  const adminPages = [
    { name: "All Users", path: "/admin_panel/users_list/" },
    { name: "All Blogs", path: "/admin_panel/blogs_list/" },
    { name: "Admin Home", path: "/admin_panel/home/" },
    { name: "Blog Comments", path: "/admin_panel/blog_comments/" },
    { name: "Python Compiler", path: "/python-compiler/" },
    { name: "Profile", path: `/author/profile/${user && user.user_id}/` },
    { name: "Write", path: "/write" },
  ];
  let pages =
    user?.is_super_admin && user.is_staff
      ? adminPages
      : user?.is_staff
      ? authorPages
      : userPages;
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative" sx={{ background: "#c7c7c7" }}>
        <Toolbar>
          {isMatch ? (
            <>
              <DrawerComp />
              <Link to="/">
                <Typography
                  variant="h5"
                  sx={{
                    color: "black",
                    fontFamily: "Impact",
                    textDecoration: "none",
                  }}
                  className="typo_nav"
                >
                  DevHut
                </Typography>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <Typography
                  variant="h4"
                  sx={{
                    color: "black",
                    fontFamily: "Impact",
                    textDecoration: "none",
                  }}
                  className="typo_nav"
                >
                  DevHut
                </Typography>
              </Link>
              <Tabs
                sx={{ color: "black" }}
                value={value}
                onChange={(e, value) => setValue(value)}
                textColor="inherit"
                indicatorColor="secondary"
              >
                {pages.map((page, index) => (
                  <Tab
                    key={index}
                    label={page.name}
                    onClick={() => navigate(page.path)}
                  />
                ))}
              </Tabs>
            </>
          )}

          <form onSubmit={searchBlogsValidation}>
            <div style={{ display: "flex", marginLeft: "20px", marginTop: "" }}>
              <InputBase
                value={searchKey}
                name="search_key"
                onChange={handleSearch}
                style={{
                  marginLeft: "20px",
                  background: "white",
                  flex: 1,
                  marginLeft: "auto",
                  height: "30px",
                  borderRadius: "2px",
                  border: "none",
                }}
                placeholder="Search blogs"
                type="text"
                className="searchfield"
              />
              <button
                className="search_button"
                style={{ height: "30px", border: "none" }}
              >
                <SearchIcon />
              </button>
            </div>
          </form>
          {user ? (
            <div style={{ marginLeft: "auto" }}>
              <Link style={{ textDecoration: "none" }} to="/">
                <Box>
                  <Button variant="contained" size="small" onClick={logoutUser}>
                    Logout
                  </Button>
                </Box>
              </Link>
            </div>
          ) : (
            <div style={{ marginLeft: "auto" }}>
              <Link style={{ textDecoration: "none" }} to="/user/login">
                <Button variant="contained" size="small">
                  Login
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/user/signup">
                <Button
                  variant="contained"
                  size="small"
                  sx={{ marginLeft: "10px" }}
                >
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
