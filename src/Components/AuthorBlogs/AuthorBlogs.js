import React, { useContext } from "react";
import {
  Card,
  CardContent,
  ThemeProvider,
  CardMedia,
  Grid,
  Box,
  Typography,
  CardActionArea,
} from "@mui/material";
import theme from "../../Utils/theme";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AppContext from "../../Context/AppContext";
import './authorBlogs.css';

function AuthorBlogs() {

  let { authorProfileData, singleBlogView } = useContext(AppContext);
  return (
    <div>
      <Typography variant="h5" style={{ marginLeft: "5%",fontFamily:' Fantasy' }}>
        Blogs
      </Typography>

      <ThemeProvider theme={theme}></ThemeProvider>
      <Grid spacing={{ xs: 1, sm: 2, md: 3 }} sx={{display:'flex',flexWrap:'wrap'}} >
        {authorProfileData
          ? authorProfileData.author.map((obj) => (
              <Grid item xl={4} xs={12} sm={12} lg={6}>
                <ThemeProvider theme={theme}></ThemeProvider>
                <Card 
                  className="author_blogs"
                  variant="outlined"
                  sx={{margin:'10px',}}
                >
                  <CardActionArea onClick={() => singleBlogView(obj.id)}>
                    <Box
                      className="box2"
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={obj.image}
                        alt=""
                      />
                      <div
                        className="b_details"
                        style={{ padding: " 2px 10px" }}
                      >
                         {obj.author.image?
                          <CardMedia sx={{width:'35px',borderRadius:'50%'}}
                          component="img"
                          height="35"
                          image={obj.author.image}
                          alt=""
                        />:
                            <AccountCircleOutlinedIcon/>
                            }

                        <Typography style={{ marginLeft: "3px" }}>
                          {obj.author.first_name}
                        </Typography>
                        <div
                          style={{ position: "relative", marginLeft: "auto" }}
                        >
                          <Typography variant="caption">
                            {obj.created_at} ago
                          </Typography>
                        </div>
                      </div>
                      <div
                        style={{ marginTop: "-10px", marginBottom: "-20px" }}
                      >
                        <CardContent>
                          <Typography className="contentHead" variant="p">
                            {obj.title}
                          </Typography>
                          <Typography className="contentDes" variant="body2">
                            {obj.content}
                          </Typography>
                          <div>
                            <Typography variant="caption">
                              {obj.read_time} min read
                            </Typography>

                            <button className="categoryButton">
                              {obj.category.category}
                            </button>
                            <Typography
                              sx={{ marginLeft: "3px" }}
                              variant="caption"
                            >
                              {obj.likes} likes
                            </Typography>
                          </div>
                        </CardContent>
                      </div>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </div>
  );
}

export default AuthorBlogs;
