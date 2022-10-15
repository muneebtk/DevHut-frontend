import {
  Card,
  CardContent,
  ThemeProvider,
  CardMedia,
  Grid,
  Typography,
  CardActionArea,
  Tabs,
  Tab,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./blogs.css";
import AppContext from "../../Context/AppContext";
import theme from "../../Utils/theme";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";

function Blogs() {
  let { allBlogs, singleBlogView } = useContext(AppContext);
  let { authTokens } = useContext(AuthContext);
  const BASE_URL = "http://13.233.6.228";
  let [searchParams, setSearchParams] = useSearchParams();
  let [followingBlogsData, setFollowingBlogsData] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };
  const followingBlogs = searchParams.get("filter") === "following";

  let getFollowingBlogs = async () => {
    axios.get(BASE_URL + "/following_blogs/", config).then((response) => {
      if (response.status === 200) {
        setFollowingBlogsData(response.data);
      } else {
      }
    }).catch((error)=>{
      navigate('user/login/')
    })
  }
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const followingFilter = () => {
    setSearchParams({ filter: "following" });
    getFollowingBlogs();
  };
  let unFollowingFilter = () => {
    setSearchParams({});
  };
  let navigate = useNavigate();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Tabs
          sx={{ marginLeft: "4%" }}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="All Blogs" onClick={unFollowingFilter} />
          <Tab value="two" label="Following" onClick={followingFilter} />
        </Tabs>
      </ThemeProvider>
      <Grid className="grid1" spacing={{ xs: 1, sm: 2, md: 3 }} container>
        {!followingBlogs &&
          allBlogs.serializer &&
          allBlogs.serializer.map((blog) => (
            <Grid item xl={4} xs={12} sm={6} lg={4}>
              <ThemeProvider theme={theme}></ThemeProvider>
              <Card
                className="card4"
                variant="outlined"
                sx={{ marginTop: "10px",marginBottom:'5px' }}
              >
                <CardContent>
                  <CardActionArea onClick={() => singleBlogView(blog.id)} sx={{marginBottom:'auto'}}>
                    <Box
                      className="box2"
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={BASE_URL + blog.image}
                        alt="Paella dish"
                      />
                      <div
                        className="b_details"
                        style={{ padding: " 2px 10px" }}
                      >
                        {blog.author.image ? (
                          <CardMedia
                            sx={{ width: "35px", borderRadius: "50%" }}
                            component="img"
                            height="35"
                            image={BASE_URL + blog.author.image}
                            alt="author"
                          />
                        ) : (
                          <AccountCircleOutlinedIcon />
                        )}
                        <Typography style={{ marginLeft: "3px" }}>
                          {blog.author.first_name}
                        </Typography>
                        <div
                          style={{ position: "relative", marginLeft: "auto" }}
                        >
                          <Typography variant="caption">
                            {blog.created_at} ago
                          </Typography>
                        </div>
                      </div>
                      <div>
                        <Typography className="contentHead" variant="p">
                          {blog.title}
                        </Typography>
                        <Typography className="contentDes" variant="body2">
                          {blog.content}
                        </Typography>
                      </div>
                    </Box>
                  </CardActionArea>

                  <div className="blog_details" sx={{display:'flex'}}>
                    <Typography variant="caption">
                      {blog.read_time} min read .
                    </Typography>
                    <button
                      className="categoryButton"
                      onClick={() =>
                        navigate(`/blogs/${blog.category.category_slug}/`)
                      }
                    >
                      {blog.category.category}
                    </button>{" "}
                    .
                    <Typography sx={{ marginLeft: "3px" }} variant="caption">
                      {blog.likes} likes
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}

{/* following blogs */}

        {followingBlogs &&
          followingBlogsData &&
          followingBlogsData.map((blog) => (
            <Grid item xl={3} xs={12} sm={6} lg={4}>
              <ThemeProvider theme={theme}></ThemeProvider>
              <Card
                className="card4"
                variant="outlined"
                sx={{ marginTop: "10px" }}
              >
                <CardActionArea onClick={() => singleBlogView(blog.id)}>
                  <Box
                    className="box2"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={BASE_URL + blog.image}
                      alt="Paella dish"
                    />
                    <div className="b_details" style={{ padding: " 2px 10px" }}>
                      {blog.author.image ? (
                        <CardMedia
                          sx={{ width: "35px", borderRadius: "50%" }}
                          component="img"
                          height="35"
                          image={BASE_URL + blog.author.image}
                          alt="Paella dish"
                        />
                      ) : (
                        <AccountCircleOutlinedIcon />
                      )}
                      <Typography style={{ marginLeft: "3px" }}>
                        {blog.author.first_name}
                      </Typography>
                      <div style={{ position: "relative", marginLeft: "auto" }}>
                        <Typography variant="caption">
                          {blog.created_at}
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <CardContent>
                        <Typography className="contentHead" variant="p">
                          {blog.title}
                        </Typography>
                        <Typography className="contentDes" variant="body2">
                          {blog.content}
                        </Typography>
                        <div className="blog_details">
                          <Typography variant="caption">
                            {blog.read_time} min read
                          </Typography>

                          <button className="categoryButton">
                            {blog.category.category}
                          </button>
                          <Typography
                            sx={{ marginLeft: "3px" }}
                            variant="caption"
                          >
                            {blog.likes} likes
                          </Typography>
                        </div>
                      </CardContent>
                    </div>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Blogs;
