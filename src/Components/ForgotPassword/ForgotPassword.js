import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import "./forgotPassword.css";
import EmailIcon from "@mui/icons-material/Email";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "../../Utils/axios";

function ForgotPassword() {
  let [email, setEmail] = useState();
  let [error, setError] = useState();
  let [backRes, setBackRes] = useState("");
  let handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  let fieldValidation = (e) => {
    e.preventDefault();
    const regEx =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regEx.test(email)) {
      forgotPassword(email);
    } else {
      setError("Please enter a valid email");
    }
  };

  let forgotPassword = async (email) => {
    await axios
      .post("/user/forgot_password/", {
        email: email,
      })
      .then((response) => {
        if (response.status === 200) {
          setBackRes(response.data);
        } else {
          setBackRes("Something goes wrong.");
        }
      });
  };

  return (
    <div>
      <Grid>
        <Paper elevation={5} className="paper_forgot">
          <Grid align="center" className="grid_forgot">
            <Avatar sx={{ bgcolor: blue[300] }}>
              <EmailIcon />
            </Avatar>
            <Typography variant="h4" className="typo_forgot">
              Forgot Password
            </Typography>
          </Grid>
          <Grid>
            {backRes.error ? (
              <Alert severity="error">{backRes.error}</Alert>
            ) : null}

            {backRes.success ? (
              <Alert severity="success">{backRes.success}</Alert>
            ) : null}
            {error ? (
              <Typography
                variant="body2"
                style={{ color: "red", textAlign: "center" }}
              >
                {error}
              </Typography>
            ) : null}
            <form onSubmit={fieldValidation} noValidate>
              <TextField
                name="email"
                onChange={handleEmail}
                style={{ marginTop: "10px" }}
                variant="standard"
                type="email"
                label="Email"
                placeholder="Enter Email"
                fullWidth="true"
              ></TextField>
              <Button
                type="submit"
                style={{ marginTop: "20px" }}
                fullWidth="true"
                className="button1"
                variant="outlined"
              >
                submit
              </Button>
              <br />
              <br />
            </form>
            <Typography variant="body2">
              Dont have an account?
              <Link
                style={{
                  marginTop: "30px",
                  color: "#0033cc",
                  textDecoration: "none",
                }}
                to="/user/signup"
              >
                Signup
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default ForgotPassword;
