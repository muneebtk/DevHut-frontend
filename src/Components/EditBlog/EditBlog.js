import {
  Alert,
  Button,
  Card,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useContext, useEffect } from "react";
import theme from "../../Utils/theme";
import axios from "../../Utils/axios";
import AuthContext from "../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
  useEffect(() => {
    EditBlog(id);
  }, []);

  let { authTokens } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };
  const [successResponseMsg, setSuccessResponseMsg] = useState(null);
  const [errorResponseMsg, setErrorResponseMsg] = useState(null);
  const [imageError, setImageError] = useState();
  const [titleError, setTitleError] = useState();
  const [contentError, setContentError] = useState();
  const [categoryError, setCategoryError] = useState();
  const [readTimeError, setReadTimeError] = useState();

  let [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [readTime, setReadTime] = useState();
  let params = useParams();
  let id = params.id;
  let navigate = useNavigate();

  let EditBlogValidation = (e) => {
    e.preventDefault();
    if (!title) {
      setTitleError("Please enter title");
      return false;
    }
    if (!content) {
      setContentError("Plese enter the content");
      return false;
    }
    if (!category) {
      setCategoryError("Plese enter the category");
      return false;
    }
    if (!readTime) {
      setReadTimeError("Plese enter the read time");
      return false;
    }
    SubmitEditedData(id);
  };
  let form_data = new FormData();

  form_data.append("image", image);
  form_data.append("title", title);
  form_data.append("content", content);
  form_data.append("category", category);
  form_data.append("read_time", readTime);

  let SubmitEditedData = () => {
    axios.put(`/blogs/edit_blog/${id}/`, form_data, config).then((response) => {
      if (response.status === 200) {
        setSuccessResponseMsg(response.data);
      } else {
        setErrorResponseMsg(response.data);
      }
    });
  };

  let EditBlog = (id) => {
    axios.get(`/blogs/edit_blog/${id}/`, config).then((response) => {
      if (response.status === 200) {
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategory(response.data.category);
        setReadTime(response.data.read_time);
      } else {
        navigate("/");
        setErrorResponseMsg(response.data);
      }
    });
  };

  return (
    <div>
      <Grid
        style={{
          padding: "20px 0",
          backgroundColor: "silver",
          minHeight: "100vh",
        }}
      >
        <Card
          className="card3"
          style={{
            margin: "auto",
            width: "80%",
            borderRadius: "20px",
            marginTop: "10px",
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography style={{ textAlign: "center" }} variant="h4">
              Edit Blog
            </Typography>
            <hr style={{ width: "100px" }} />
          </ThemeProvider>

          <form onSubmit={EditBlogValidation} noValidate>
            <Grid style={{ padding: "5px 20px" }}>
              {successResponseMsg ? (
                <Alert
                  onClose={() => {
                    setSuccessResponseMsg(null);
                  }}
                  align="center"
                  severity="success"
                >
                  {successResponseMsg}
                </Alert>
              ) : null}
              {errorResponseMsg ? (
                <Alert
                  onClose={() => {
                    setErrorResponseMsg(null);
                  }}
                  align="center"
                  severity="error"
                >
                  {errorResponseMsg}
                </Alert>
              ) : null}

              <label htmlFor="">
                <Typography variant="body2">Upload image</Typography>
              </label>
              <input
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/png, image/jpeg, image/jpg"
                type="file"
              />
              <br />
              {imageError ? (
                <Typography color="red" variant="caption">
                  {imageError}
                </Typography>
              ) : null}

              <label htmlFor="">
                <Typography style={{ marginTop: "10px" }} variant="body2">
                  Enter title
                </Typography>
              </label>
              <TextField
                value={title}
                name="title"
                type="text"
                style={{ margin: "" }}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth={true}
              ></TextField>
              {titleError ? (
                <Typography color="red" variant="caption">
                  {titleError}
                </Typography>
              ) : null}

              <Typography style={{ paddingTop: "10px" }} variant="body2">
                Enter content
              </Typography>
              <textarea
                value={content}
                name="content"
                className="boxsizingBorder"
                cols="30"
                rows="4"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              {contentError ? (
                <Typography color="red" variant="caption">
                  {contentError}
                </Typography>
              ) : null}

              <label>
                <Typography style={{ paddingTop: "10px" }} variant="body2">
                  Enter category
                </Typography>
              </label>
              <TextField
                value={category}
                name="category"
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
              ></TextField>
              {categoryError ? (
                <Typography color="red" variant="caption">
                  {categoryError}
                </Typography>
              ) : null}

              <label htmlFor="">
                <Typography style={{ paddingTop: "10px" }} variant="body2">
                  Enter read time
                </Typography>
              </label>
              <TextField
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                name="read_time"
                type="text"
                fullWidth
              ></TextField>
              {readTimeError ? (
                <Typography color="red" variant="caption">
                  {readTimeError}
                </Typography>
              ) : null}
            </Grid>

            <Box
              component="div"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        </Card>
      </Grid>
    </div>
  );
}

export default EditBlog;
