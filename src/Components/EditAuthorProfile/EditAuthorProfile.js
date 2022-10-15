import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import theme from "../../Utils/theme";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

function EditAuthorProfile() {
  const [imageError, setImageError] = useState();
  const [titleError, setTitleError] = useState();
  const [contentError, setContentError] = useState();
  const [successResponseMsg, setSuccessResponseMsg] = useState(null);
  const [errorResponseMsg, setErrorResponseMsg] = useState(null);
  const [fieldError, setFieldError] = useState();
  let [image, setImage] = useState();
  const BASE_URL = "http://13.233.6.228";
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [email, setEmail] = useState();
  let [aboutUser, setAboutUser] = useState();
  let params = useParams();
  let { authTokens } = useContext(AuthContext);
  const [resStatusSuccess, setResStatusSuccess] = useState();
  const [resStatusError, setResStatusError] = useState();
  const [authorEditDetails, setAuthorEditDetails] = useState();
  let x = params.id;
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };
  let navigate = useNavigate();
  useEffect(() => {
    getUserProfileDetails();
  }, []);
  // fetching author details
  let getUserProfileDetails = async () => {
    axios
      .get(BASE_URL + `/edit_author_profile/${x}/`, config)
      .then((response) => {
        if (response.status === 200) {
          // setAuthorEditDetails(response.data)
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
          setEmail(response.data.email);
          setAboutUser(response.data.about);
        } else {
          // setGetDetailsRes(response.data)
        }
      })
      .catch(() => {
        navigate("/");
      });
  };

  let formValidation = (e) => {
    e.preventDefault();
    if (firstName == "") {
      setFieldError("Please enter the first name");
      return false;
    }
    const re = /^[a-zA-Z](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z]){3,18}[a-zA-Z]$/i;
    if (firstName.length < 2 && re.test(firstName)) {
      setFieldError("First name must contain atleast 2 characters");
      return false;
    }
    if (lastName == "") {
      setFieldError("Please enter last name");
      return false;
    }
    const regEx =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regEx.test(email)) {
      setFieldError(
        "Invalid email or Field is empty, please enter a valid email."
      );
      return false;
    }
    EditAuthorProfile();
  };

  let EditAuthorProfile = async () => {
    let form_data = new FormData();
    form_data.append("image", image);
    form_data.append("first_name", firstName);
    form_data.append("last_name", lastName);
    form_data.append("email", email);
    form_data.append("about", aboutUser);

    axios
      .put(BASE_URL + `/edit_author_profile/${x}/`, form_data, config)
      .then((response) => {
        if (response.status === 200) {
          setResStatusSuccess(response.data);
        } else {
          setResStatusError(response.data);
        }
      });
  };

  return (
    <div>
      <div style={{ backgroundColor: "silver", height: "100vh" }}>
        <Grid style={{ padding: "20px 0" }}>
          <Card
            className="card3"
            style={{
              margin: "auto",
              minWidth: "200px",
              maxWidth: "450px",
              borderRadius: "20px",
              marginTop: "10px",
            }}
          >
            <ThemeProvider theme={theme}>
              <Typography
                style={{ textAlign: "center", marginTop: "10px" }}
                variant="h5"
              >
                Edit Profile
              </Typography>
              <hr style={{ width: "100px" }} />
            </ThemeProvider>
            {resStatusSuccess ? (
              <Alert severity="success">{resStatusSuccess}</Alert>
            ) : null}
            {resStatusError ? (
              <Alert severity="error">{resStatusError}</Alert>
            ) : null}
            {fieldError ? <Alert severity="error">{fieldError}</Alert> : null}
            <div style={{ margin: "5px 10px" }}>
              <form onSubmit={formValidation} noValidate>
                <Typography>First Name</Typography>
                <TextField
                  id="standard-basic"
                  style={{ marginTop: "5px" }}
                  fullWidth
                  variant="standard"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <Typography>Last Name</Typography>
                <TextField
                  id="standard-basic"
                  fullWidth
                  style={{ marginTop: "5px" }}
                  variant="standard"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <Typography>Email</Typography>
                <TextField
                  id="standard-basic"
                  fullWidth
                  type="email"
                  variant="standard"
                  style={{ marginTop: "5px" }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Typography>Description</Typography>
                <textarea
                  id="standard-basic"
                  style={{ width: "100%", height: "70px", marginTop: "5px" }}
                  placeholder="More about you"
                  variant="filled"
                  onChange={(e) => setAboutUser(e.target.value)}
                  value={aboutUser}
                />

                <Typography variant="body2">Select image</Typography>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <br name="image" />
                <Box align="center" mt>
                  <Button type="submit">submit</Button>
                </Box>
              </form>
            </div>
          </Card>
        </Grid>
      </div>
    </div>
  );
}

export default EditAuthorProfile;
