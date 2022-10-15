import {
  Card,
  CardContent,
  ThemeProvider,
  CardMedia,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./home.css";
import theme from "../../Utils/theme";
import AppContext from "../../Context/AppContext";

function Home() {
  let { blogs, allBlogs, singleBlogView } = useContext(AppContext);

  useEffect(() => {
    blogs();
  }, []);

  return (
    <div className="homePage">
      <ThemeProvider theme={theme}>
        <Typography variant="subtitle1">Trending on DevHut</Typography>
      </ThemeProvider>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        {allBlogs.trending_blogs
          ? allBlogs.trending_blogs.slice(0, 8).map((blog) => (
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <ThemeProvider theme={theme}></ThemeProvider>
                <Card
                  className="card"
                  variant="outlined"
                  sx={{ maxWidth: 300, maxHeight: 150, marginTop: "10px" }}
                >
                  <CardActionArea onClick={() => singleBlogView(blog.id)}>
                    <div className="b_details" style={{ padding: " 2px 10px" }}>
                      {blog.author.image ? (
                        <CardMedia
                          sx={{ width: "30px", borderRadius: "50%" }}
                          component="img"
                          height="30"
                          image={ blog.author.image}
                          alt="Author Image"
                        />
                      ) : (
                        <AccountCircleOutlinedIcon />
                      )}

                      <Typography style={{ marginLeft: "3px" }}>
                        {blog.author.first_name}
                      </Typography>
                      <div style={{ position: "", marginLeft: "auto" }}>
                        <Typography variant="caption">
                          {blog.created_at} ago
                        </Typography>
                      </div>
                    </div>
                    <div style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                      <CardContent>
                        <Typography style={{marginBottom:'-10px',marginLeft:''}} className="contentHead" variant="p">
                          {blog.title}
                        </Typography>
                        </CardContent>
                        <Typography style={{marginLeft:'15px'}} variant="caption">
                          {blog.read_time} min read .
                        </Typography>

                        <button className="categoryButton">
                          {blog.category.category}{" "}
                        </button>
                        <Typography
                          sx={{ marginLeft: "3px" }}
                          variant="caption"
                        >
                          . {blog.likes} likes
                        </Typography>
                      
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </div>
  );
}

export default Home;
