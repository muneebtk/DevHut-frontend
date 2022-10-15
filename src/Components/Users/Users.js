import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import axios from '../../Utils/axios'
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/AuthContext";

function Users() {
  let { authTokens } = useContext(AuthContext);
  let [usersData, setUsersData] = useState();
  let [userState, setUserState] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };
  let AllUsers = () => {
    axios.get( "/admin_panel/users/", config).then((response) => {
      setUsersData(response.data);
    });
  };
  useEffect(() => {
    AllUsers();
  }, []);
  let BlockOrUnblockUser = (id) => {
    axios.patch( `/admin_panel/users/${id}/`,{},config).then((response) => {
      AllUsers();
    });
  };
 
  return (
    <div style={{ minHeight: "80vh" }}>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Followers</TableCell>
              <TableCell align="center">Is Active</TableCell>
              <TableCell align="center">Is Writer</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData &&
              usersData.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.first_name}
                  </TableCell>
                  <TableCell align="center">{row.last_name}</TableCell>
                  <TableCell style={{ width: 40 }} align="center">
                    {row.email}
                  </TableCell>
                  <TableCell align="center">{row.phone_number}</TableCell>
                  <TableCell align="center">{row.followers}</TableCell>
                  <TableCell align="center">
                    {row.is_active === true ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {row.is_staff ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {row.is_active ? (
                      <Button variant="outlined" size="small"
                        onClick={() => BlockOrUnblockUser(row.id)}
                        color="error"
                      >
                        block
                      </Button>
                    ) : (
                      <Button variant="outlined" size="small"
                        onClick={() => BlockOrUnblockUser(row.id)}
                        color="success"
                      >
                        UnBlock
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Users;
