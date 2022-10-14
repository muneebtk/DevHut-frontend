import { Button, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
  let { user } = useContext(AuthContext);
  let navigate = useNavigate()
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
  ];
  let pages =
    user?.is_super_admin && user.is_staff
      ? adminPages
      : user?.is_staff
      ? authorPages
      : userPages;
  return (
    <div>
      <Paper sx={{ width: "100%", background: "#e3e1e1" ,paddingTop:'15px'}}>
        <Typography
          variant="h5"
          textAlign="center"
          style={{ fontFamily: "Impact" ,paddingTop:'5px',textDecoration:'underline'}}
        >
          DevHut
        </Typography>
        <div align="center">
            <Button onClick={()=>navigate('/')}>Home</Button>
          {pages.map((obj) => (
            <Button sx={{margin:'10px',flexWrap:'wrap'}} onClick={()=>navigate(obj.path)}>{obj.name}</Button>
          ))}
          <br/>
          <CopyrightIcon fontSize=""/>
          <Typography variant="caption">2022 DevHut. All rights reserved</Typography>

        </div>
      </Paper>
    </div>
  );
}

export default Footer;
