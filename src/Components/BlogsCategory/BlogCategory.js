import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import "./blogsCategory.css";
import theme from "../../Utils/theme";
import AppContext from "../../Context/AppContext";
import { useParams } from "react-router-dom";

function BlogsCategory() {
  let params = useParams();
  let x = params.slug;
  let { allBlogs, CategoryView, makeTitle } = useContext(AppContext);
  let navigateFunction = (y) => (CategoryView(y), makeTitle(x));

  return (
    <div className="blogs">
      <div sx={{ position: "fixed" }}>
        <hr />
        <ThemeProvider theme={theme}>
          <Typography className="subtitle1" variant="subtitle1">
            Discover more of what matters to you{" "}
          </Typography>
        </ThemeProvider>
        <div className="cat_name"
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {allBlogs.cat_serializer
            ? allBlogs.cat_serializer.map((obj) => (
                <div>
                  <Box>
                    <button
                      className="categoryButton1"
                      onClick={() => navigateFunction(obj.category_slug)}
                    >
                      {obj.category}
                    </button>
                  </Box>
                </div>
              ))
            : null}
          </div>
        <hr />
      </div>
    </div>
  );
}

export default BlogsCategory;
