import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import "./signup.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

function Signup() {
  let { SignupUser, signupResError } = useContext(AuthContext);
  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  let [email, setEmail] = useState();
  let [phone, setPhoneNumber] = useState();
  let [password, setPassword] = useState();
  let [confirmPassword, setConfirmPassword] = useState();

  let [fieldError, setFieldError] = useState();

  useEffect(() => {
    let timeId = setTimeout(() => {
      setFieldError(false);
    });
  }, 5000);

  let fieldValidation = (e) => {
    e.preventDefault();
    if (firstName != null) {
      const re = /^[a-zA-Z](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z]){3,18}[a-zA-Z]$/i;

      if (firstName.length > 2 && re.test(firstName)) {
        const regEx =
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (regEx.test(email)) {
          const regex =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;

          if (regex.test(phone) && phone.length === 10) {
            if (password === confirmPassword && password.length > 5) {
              SignupUser(
                firstName,
                lastName,
                email,
                phone,
                password,
                confirmPassword
              );
          
            } else {
              setFieldError("Password is empty or does not matching.");
            }
          } else {
            setFieldError("Invalid Phone number or field in empty");
          }
        } else {
          setFieldError("Invalid email address or field in empty");
        }
      } else {
        setFieldError("First name must contain atleast 5 characters.");
      }
    } else {
      setFieldError("Please enter your details");
    }
  };

  let handleFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };
  let handleEmail = (e) => {
    setEmail(e.target.value);
  };
  let handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
  };
  let handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  let handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const [open, setOpen] = useState(false);
  let handleClick = () => {
    setOpen(false);
  };
  return (
    <div>
      <Grid>
        <Paper elevation={5} className="paper_signup">
          <Grid align="center" className="grid_signup">
            <Avatar sx={{ bgcolor: blue[500] }}>
              <ExitToAppIcon />
            </Avatar>
            <Typography variant="h4" className="typo_signup">
              Signup
            </Typography>
          </Grid>
          <Grid>
            {signupResError ? (
              <Alert severity="error">{signupResError}</Alert>
            ) : null}

            {fieldError ? <Alert severity="error">{fieldError}</Alert> : null}

            <form onSubmit={fieldValidation} noValidate>
              <TextField
                name="first_name"
                onChange={handleFirstName}
                style={{ marginTop: "10px" }}
                variant="standard"
                type="text"
                label="First Name"
                placeholder="Enter First Name"
                fullWidth="true"
              ></TextField>

              <TextField
                name="last_name"
                onChange={handleLastName}
                style={{ marginTop: "10px" }}
                variant="standard"
                type="text"
                label="Last Name"
                placeholder="Enter Last Name"
                fullWidth="true"
              ></TextField>

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

              <TextField
                name="phone_number"
                onChange={handlePhoneNumber}
                style={{ marginTop: "10px" }}
                variant="standard"
                type="text"
                label="Phone Number"
                placeholder="Enter Phone Number"
                fullWidth="true"
              ></TextField>

              <TextField
                name="password"
                onChange={handlePassword}
                style={{ marginTop: "10px" }}
                variant="standard"
                type="password"
                label="Password"
                placeholder="Enter Password"
                fullWidth="true"
              ></TextField>
              <span style={{color:'red'}}>*</span><Typography variant="caption" style={{ color: "" }}>
                Password must contain atleast 6 characters
              </Typography>

              <TextField
                name="confirm_password"
                onChange={handleConfirmPassword}
                style={{ marginTop: "10px" }}
                variant="standard"
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                fullWidth="true"
              ></TextField>

              <Button
                type="submit"
                style={{ marginTop: "20px" }}
                fullWidth="true"
                className="button1"
                variant="outlined"
              >
                signup
              </Button>
              <br />
              <br />
            </form>
            <Typography variant="body2">
              Have an account?
              <Link
                style={{
                  marginTop: "30px",
                  color: "#0033cc",
                  textDecoration: "none",
                }}
                to="/user/login"
              >
                Signin
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default Signup;
