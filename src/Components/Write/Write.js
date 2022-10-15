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
import "./write.css";
import axios from "../../Utils/axios";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Write() {
  let [image, setImage] = useState();
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
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setSuccessResponseMsg(null);
    }, 5000);
  }, []);
  let navigate = useNavigate()
  const BASE_URL = 'https://www.devhut.lappie.store'

  let WriteBlog = async (e) => {
    e.preventDefault();
    if (!image) {
      setImageError("Please select an image.");
      return false;
    }
    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setImageError("Please select a valid image");
      return false;
    }
    if (!e.target.title.value) {
      setTitleError("Please enter title");
      return false;
    }
    if (!e.target.content.value) {
      setContentError("Plese enter the content");
      return false;
    }

    let form_data = new FormData();

    form_data.append("image", image);
    form_data.append("title", e.target.title.value);
    form_data.append("content", e.target.content.value);
    form_data.append("category", e.target.category.value);
    form_data.append("read_time", e.target.read_time.value);

    await axios.post("blogs/", form_data, config).then((response) => {
      if (response.status === 201) {
        setSuccessResponseMsg(response.data)
        navigate('/')
      } else {
        setErrorResponseMsg(response.data);
      }
    }).catch((error)=>{
      navigate('/user/login/')
    })
  }

  return (
    <div>
      <div style={{ backgroundColor: "silver", minHeight: "100vh" }}>
        <Grid style={{ padding: "20px 0" }}>
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
              <Typography style={{ textAlign: "center" }} variant="h5">
                Create Blog
              </Typography>
              <hr style={{ width: "100px" }} />
            </ThemeProvider>

            <form noValidate onSubmit={WriteBlog}>
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
               
                <input hidden accept="image/*" multiple onChange={(e) => setImage(e.target.files[0])} type="file" />

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
                  name="title"
                  type="text"
                  style={{ margin: "" }}
                  required
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
                  name="content"
                  className="boxsizingBorder"
                  cols="30"
                  rows="10"
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
                <TextField name="category" type="text" fullWidth></TextField>

                <label htmlFor="">
                  <Typography style={{ paddingTop: "10px" }} variant="body2">
                    Enter read time( in minute)
                  </Typography>
                </label>
                <TextField name="read_time" type="text" fullWidth></TextField>
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
    </div>
  );
}

export default Write;
