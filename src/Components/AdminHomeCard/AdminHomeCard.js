import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import GroupIcon from "@mui/icons-material/Group";

function AdminHomeCard(props) {
  const {text,count} = props;
  return (
    <div>
      <Card sx={{ height: "90px", width: "200px", margin: "5px" }}>
        <Grid item xs={12} lg={4}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <GroupIcon sx={{ color: "skyblue", fontSize: "60px" }} />
            <div style={{ color: "skyblue", fontSize: "60px" }}>
              {/* {icon} */}
            </div>
            <Typography>
              {text}:{count}
            </Typography>
          </div>
        </Grid>
      </Card>
    </div>
  );
}

export default AdminHomeCard;
