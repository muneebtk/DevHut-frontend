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
function AdminComments() {
  let { authTokens } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };
  let [commentsData, setCommentsData] = useState();
  useEffect(() => {
    AllComments();
  }, []);
  let AllComments = () => {
    axios
      .get( "/admin_panel/all_comments/", config)
      .then((response) => {
        setCommentsData(response.data);
      });
  };

  let BlockOrUnblockComment = (id) => {
    axios
      .put( `/admin_panel/block_or_unblock_comment/${id}/`,config)
      .then((response) => {
        AllComments();
      });
  };
  return (
    <div style={{minHeight:'80vh'}}>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Comment</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commentsData &&
              commentsData.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.user}
                  </TableCell>
                  <TableCell align="center">{row.comment}</TableCell>
                  <TableCell style={{ width: 40 }} align="center">
                    {row.created_at}
                  </TableCell>
                  <TableCell align="center">
                    {row.is_blocked ? (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => BlockOrUnblockComment(row.id)}
                        color="error"
                      >
                        block
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => BlockOrUnblockComment(row.id)}
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

export default AdminComments;
