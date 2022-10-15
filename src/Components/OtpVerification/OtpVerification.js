import React, { useContext, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import "./otpVerification.css";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { green } from "@mui/material/colors";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

function OtpVerification() {
  let { VerifyUser, signupResSuccess, otpResError } = useContext(AuthContext);
  let [otpError, setOtpError] = useState();

  let otpValidation = (e) => {
    e.preventDefault();
    let otp = e.target.otp.value;
    var regEx = /^\d+$/;
    if (otp.length === 0) {
      setOtpError("The field is empty,Please enter your otp.");
    } else if (regEx.test(otp) && otp.length === 6) {
      VerifyUser(otp);
    } else {
      setOtpError("Please enter the valid otp");
    }
  };

  return (
    <div>
      <Grid>
        <Paper elevation={5} className="paper_otp">
          <Grid align="center" className="grid_otp">
            <Avatar sx={{ bgcolor: green[500] }}>
              <CheckCircleOutlinedIcon />
            </Avatar>
            <Typography variant="h4" className="typo_otp">
              OTP Verification
            </Typography>
          </Grid>
          <Grid>
            {otpResError ? <Alert severity="error">{otpResError}</Alert> : null}

            {signupResSuccess ? (
              <Alert severity="success">{signupResSuccess}</Alert>
            ) : null}
            <form onSubmit={otpValidation}>
              {otpError ? (
                <div>
                  <TextField
                    name="otp"
                    style={{ marginTop: "10px" }}
                    inputProps={{ sx: { color: "black" } }}
                    error
                    variant="standard"
                    type="text"
                    label="Enter OTP"
                    fullWidth="true"
                  ></TextField>
                  <Typography
                    align="center"
                    variant="caption"
                    style={{ color: "red" }}
                  >
                    {otpError}
                  </Typography>
                </div>
              ) : (
                <TextField
                  name="otp"
                  style={{ marginTop: "10px" }}
                  variant="standard"
                  type="text"
                  label="Enter OTP"
                  placeholder="Enter OTP"
                  fullWidth="true"
                ></TextField>
              )}
              <Button
                style={{ marginTop: "20px" }}
                type="submit"
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
              Dont get an OTP?
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

export default OtpVerification;
