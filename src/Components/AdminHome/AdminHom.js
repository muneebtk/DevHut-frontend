import { Card, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import axios from "axios";
import AppContext from "../../Context/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import AdminHomeCard from "../AdminHomeCard/AdminHomeCard";

function AdminHom() {
  const BASE_URL = "https://www.devhut.lappie.store";
  let { authTokens } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };
  let [usersChart, setUsersChart] = useState();
  let [homeResData, setHomeResData] = useState();
  let [blogsChart, setBlogsChart] = useState();
  useEffect(() => {
    AdminHome();
  }, []);

  let AdminHome = () => {
    axios.get(BASE_URL + "/admin_panel/home/").then((response) => {
      if (response.status === 200) {
        setHomeResData(response.data);
        setUsersChart(response.data.chart);
        setBlogsChart(response.data.blogs);
      }
    });
  };

  return (
    <div style={{minHeight:'80vh',width:'100%',position:'relative',margin:'auto'}}>
  <Grid spacing={3}>
        <div style={{ margin: "10px auto", display: "flex", flexWrap: "wrap",width:'100%' }}>
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
                <Typography>
                  Total Users:{homeResData && homeResData.total_users}
                </Typography>
              </div>
            </Grid>
          </Card>

          <Card sx={{ height: "90px", width: "200px", margin: "5px" }}>
            <Grid item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <SupervisedUserCircleIcon
                  align="center"
                  sx={{ color: "skyblue", fontSize: "60px" }}
                />
                <Typography mb>
                  Total Writers:{homeResData && homeResData.total_writers}
                </Typography>
              </div>
            </Grid>
          </Card>

          <Card sx={{ height: "90px", width: "200px", margin: "5px" }}>
            <Grid item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <LibraryBooksIcon
                  align="center"
                  sx={{ color: "skyblue", fontSize: "60px" }}
                />
                <Typography mb>
                  Total Blogs:{homeResData && homeResData.total_blogs}
                </Typography>
              </div>
            </Grid>
          </Card>

          <AdminHomeCard
            text="Acive users"
            count={homeResData && homeResData.active_users}
          />
          <AdminHomeCard
              text= "Non Active Users"
              count= {homeResData && homeResData.non_active_users}            
          />
          
          <AdminHomeCard text='Blocked Blogs' count={homeResData&&homeResData.blocked_blogs} />
          <br />
          <div
            style={{ display: "flex", flexWrap: "wrap", margin: "20px auto" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" color={"purple"} align="center">
                New users count
              </Typography>
              <BarChart
                width={600}
                height={300}
                data={usersChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="month"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="users"
                  fill="#8884d8"
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" color={"purple"} align="center">
                New blogs count
              </Typography>
              <BarChart
                width={600}
                height={300}
                data={blogsChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="month"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="blogs"
                  fill="#8884d8"
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default AdminHom;
