import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useParams } from "react-router-dom";

function SearchResult() {
  let parms = useParams();
  const slugs = parms.slug;
  let { searchBlogs } = useContext(AppContext);

  useEffect(() => {
    searchBlogs(slugs);
  }, []);

  let { searchData, singleBlogView, CategoryView } = useContext(AppContext);
  {
    !searchData ? (searchData = 0) : (searchData = searchData);
  }

  return (
    <div style={{minHeight:'80vh'}}>
      <Typography
        style={{ fontFamily: " Fantasy", textAlign: "center" }}
        mt
        variant="h5"
      >
        <span style={{ color: "grey" }}>Search result for</span> "{slugs}"
      </Typography>
      {searchData == "" && (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <Typography
            style={{ margin: "auto auto", fontFamily: "Monospace" }}
            variant="h3"
          >
            no data found!
          </Typography>
        </div>
      )}
      <Grid className="grid1" spacing={{ xs: 1, sm: 2, md: 3 }} container>
        {searchData
          ? searchData.map((blog) => (
              <Grid item xl={4} xs={12} sm={6} lg={4}>
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
                            {blog.created_at}
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
          : null}
      </Grid>
    </div>
  );
}

export default SearchResult;
