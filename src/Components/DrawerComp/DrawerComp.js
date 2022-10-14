import React, { useContext, useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

function DrawerComp() {
  const [openDrawer, setOpenDrawer] = useState(false);
  let navigate = useNavigate();
  let {user}= useContext(AuthContext)
  const userPages = [
    { name: "Write", path: "/write" },
    { name: "About Us", path: "/" },
    {name:'Python Compiler',path:'/python-compiler'}
  ];
  const authorPages = [
    {name:'Write',path:'/write'},
    {name:'Profile',path:`/author/profile/${user&&user.user_id}/`},
    {name:'Python Compiler',path:'/python-compiler'},
    
  ]
  const adminPages = [
    {name:'All Users',path:'/admin_panel/users_list/'},
    {name:'All Blogs',path:'/admin_panel/blogs_list/'},
    {name:'Admin Home',path:'/admin_panel/home/'},
    {name:'Blog Comments',path:'/admin_panel/blog_comments/'},
    {name:'Python Compiler',path:'/python-compiler/'},
    {name:'Profile',path:`/author/profile/${user&&user.user_id}/`},
  ]
  let pages = 
  user?.is_super_admin&&user.is_staff?adminPages:
  user?.is_staff?authorPages:
  userPages
  
  return (
    <div>
      <Drawer
        PaperProps={{
          sx: {
            width: 200,
          },
        }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {pages.map((obj, index) => (
            <ListItemButton key={index} onClick={() => navigate(obj.path)}>
              <ListItemIcon>
                <ListItemText>{obj.name}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </div>
  );
}

export default DrawerComp;
