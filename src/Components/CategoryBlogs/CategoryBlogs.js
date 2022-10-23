import {
  Card,
  CardActionArea,
  CardActions,
  Box,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BlogsCategory from "../BlogsCategory/BlogCategory";

function CategoryBlogs() {
  let {
    singleBlogView,
    blogs,
    categoryData,
    CategoryView,
    titleText,
    makeTitle,
  } = useContext(AppContext);
  let { slug } = useParams();
  useEffect(() => {
    CategoryView(slug);
    makeTitle(slug);
    blogs();
  }, []);

  return (
    <div style={{ minHeight: "80vh" }}>
      <Typography align="center" variant="h5" sx={{ fontFamily: "Fantasy" }}>
        {titleText}
      </Typography>
      <div
        style={{ display: "flex", flexDirection: "row" }}
        className="category_view"
      >
        <BlogsCategory sx={{ position: "sticky" }} />
        <Grid className="grid1" spacing={{ xs: 1, sm: 2, md: 3 }} container>
          {categoryData ? (
            categoryData.map((blog) => (
              <Grid item xl={4} xs={12} sm={12} md={6} lg={6}>
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
                        height="150"
                        image={blog.image}
                        alt="blog image"
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
                            image={blog.author.image}
                            alt="blog image"
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
                      <div
                        style={{ marginTop: "-10px", marginBottom: "-20px" }}
                      >
                        <CardContent>
                          <Typography className="contentHead" variant="p">
                            {blog.title}
                          </Typography>
                          <Typography className="contentDes" variant="body2">
                            {blog.content}
                          </Typography>
                        </CardContent>
                      </div>
                    </Box>
                  </CardActionArea>

                  <div>
                    <CardActions>
                      <Typography variant="caption">
                        {blog.read_time} min read .
                      </Typography>

                      <button
                        className="categoryButton"
                        onClick={() => CategoryView()}
                      >
                        {blog.category.category}{" "}
                      </button>
                      <Typography sx={{ marginLeft: "3px" }} variant="caption">
                        . {blog.likes} likes
                      </Typography>
                    </CardActions>
                  </div>
                </Card>
              </Grid>
            ))
          ) : (
            <div align='center'>
            <Typography mt>No blogs found!</Typography>
            </div>
          )}
          {!categoryData&&'no blogs found!'}
        </Grid>
      </div>
    </div>
  );
}

export default CategoryBlogs;
